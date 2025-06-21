import React, { useState, useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

const MonacoCustomLanguages = () => {
    const editorRef = useRef(null);
    const monacoEl = useRef(null);
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [editorContent, setEditorContent] = useState('// Select a language and start coding!');

    // Available languages (built-in + custom)
    const availableLanguages = [
        { id: 'javascript', name: 'JavaScript' },
        { id: 'typescript', name: 'TypeScript' },
        { id: 'python', name: 'Python' },
        { id: 'java', name: 'Java' },
        { id: 'cpp', name: 'C++' },
    ];

    // Sample code for different languages
    const sampleCode = {
        javascript: `// JavaScript Example
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
        python: `# Python Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,
        myCustomLang: `// My Custom Language Example
def fibonacci(n) {
    if n <= 1 {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

@annotation
class Calculator {
    # This is a comment
    function calculate(x, y) {
        return x + y;
    }
}`,
        sqlplus: `-- SQL Plus Example
SELECT 
    emp.employee_id,
    emp.first_name,
    emp.last_name,
    dept.department_name,
    COUNT(*) OVER() as total_count
FROM employees emp
INNER JOIN departments dept 
    ON emp.department_id = dept.department_id
WHERE emp.salary > 50000
    AND dept.location_id IN (1700, 1800)
ORDER BY emp.last_name;`
    };

    // Initialize Monaco Editor
    useEffect(() => {
        if (monacoEl.current) {
            // Register custom languages 

            // Create the editor
            editorRef.current = monaco.editor.create(monacoEl.current, {
                value: editorContent,
                language: selectedLanguage,
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                fontSize: 14,
                tabSize: 2,
                insertSpaces: true,
                wordWrap: 'on',
                lineNumbers: 'on',
                folding: true,
                bracketMatching: 'always',
                autoIndent: 'full'
            });

            // Listen for content changes
            editorRef.current.onDidChangeModelContent(() => {
                setEditorContent(editorRef.current.getValue());
            });
        }

        return () => {
            if (editorRef.current) {
                editorRef.current.dispose();
            }
        };
    }, []);

    // Handle language change
    const handleLanguageChange = (langId) => {
        setSelectedLanguage(langId);

        if (editorRef.current) {
            const model = editorRef.current.getModel();
            monaco.editor.setModelLanguage(model, langId);

            // Set sample code for the selected language
            const sample = sampleCode[langId] || `// ${langId} code here...`;
            editorRef.current.setValue(sample);
        }
    };

    // Handle theme change
    const handleThemeChange = (theme) => {
        monaco.editor.setTheme(theme);
    };

    return (
        <div className="w-full h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">

                    <div className="flex items-center space-x-4">
                        {/* Language Selector */}
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium">Language:</label>
                            <select
                                value={selectedLanguage}
                                onChange={(e) => handleLanguageChange(e.target.value)}
                                className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {availableLanguages.map(lang => (
                                    <option key={lang.id} value={lang.id}>
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Theme Selector */}
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium">Theme:</label>
                            <select
                                onChange={(e) => handleThemeChange(e.target.value)}
                                className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                defaultValue="vs-dark"
                            >
                                <option value="vs">Light</option>
                                <option value="vs-dark">Dark</option>
                                <option value="hc-black">High Contrast</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Language Info */}
                <div className="mt-2 text-sm text-gray-300">
                    Current: <span className="font-mono bg-gray-700 px-2 py-1 rounded">{selectedLanguage}</span>
                </div>
            </div>

            {/* Editor Container */}
            <div className="h-full">
                <div
                    ref={monacoEl}
                    className="w-full h-full"
                    style={{ height: 'calc(100vh - 120px)' }}
                />
            </div>

            {/* Status Bar */}
            <div className="bg-gray-800 px-4 py-2 border-t border-gray-700 text-xs text-gray-400">
                <div className="flex justify-between items-center">
                    <div>
                        Lines: {editorContent.split('\n').length} |
                        Characters: {editorContent.length}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonacoCustomLanguages;