import React, { useState, useEffect, useRef } from "react";

const MonacoEditor = ({ onEditorChange }) => {
	const editorRef = useRef(null);
	const monacoEl = useRef(null);
	const [selectedLanguage, setSelectedLanguage] = useState("javascript");
	const [editorContent, setEditorContent] = useState("// write your code here");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Languages configuration
	const languages = [
		{ id: "javascript", name: "JavaScript" },
		{ id: "typescript", name: "TypeScript" },
		{ id: "python", name: "Python" },
		{ id: "cpp", name: "C++" },
	];

	// Sample code for different languages
	const sampleCode = {
		javascript:
			"// write your code here",
		typescript:
			"// write your code here",
		python: "# write your code here",
		cpp: '// write your code here',
	};

	// Initialize Monaco Editor
	useEffect(() => {
		let editor = null;

		const initializeEditor = async () => {
			try {
				setIsLoading(true);
				setError(null);

				// Load Monaco Editor from CDN to avoid bundling issues
				if (!window.monaco) {
					// Create script tag to load Monaco from CDN
					const script = document.createElement("script");
					script.src = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs/loader.min.js";
					script.onload = () => {
						window.require.config({
							paths: {
								vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs",
							},
						});

						window.require(["vs/editor/editor.main"], () => {
							if (monacoEl.current && window.monaco) {
								createEditor();
							}
						});
					};
					document.head.appendChild(script);
				} else {
					createEditor();
				}

				function createEditor() {
					try {
						editor = window.monaco.editor.create(monacoEl.current, {
							value: editorContent,
							language: selectedLanguage,
							theme: "vs-dark",
							automaticLayout: true,
							minimap: { enabled: false },
							scrollBeyondLastLine: false,
							fontSize: 14,
							tabSize: 2,
							insertSpaces: true,
							wordWrap: "on",
							lineNumbers: "on",
							folding: true,
							bracketMatching: "always",
							autoIndent: "full",
							// Disable features that might cause issues
							hover: { enabled: false },
							parameterHints: { enabled: false },
							suggestOnTriggerCharacters: false,
							acceptSuggestionOnCommitCharacter: false,
							acceptSuggestionOnEnter: "off",
							quickSuggestions: false,
						});

						// Listen for content changes
						editor.onDidChangeModelContent(() => {
							const value = editor.getValue();
							setEditorContent(value);

							if (onEditorChange) {
								onEditorChange(value); 
							}
						});

						editorRef.current = editor;
						setIsLoading(false);
					} catch (err) {
						console.error("Error creating editor:", err);
						setError(`Failed to create editor: ${err.message}`);
						setIsLoading(false);
					}
				}
			} catch (err) {
				console.error("Failed to load Monaco Editor:", err);
				setError(`Failed to load Monaco Editor: ${err.message}`);
				setIsLoading(false);
			}
		};

		initializeEditor();

		return () => {
			if (editor) {
				editor.dispose();
			}
		};
	}, []);

	// Handle language change
	const handleLanguageChange = (language) => {
		setSelectedLanguage(language);
		if (editorRef.current && window.monaco) {
			const model = editorRef.current.getModel();
			if (model) {
				window.monaco.editor.setModelLanguage(model, language);
			}

			// Set sample code for the selected language
			if (sampleCode[language]) {
				const newValue = sampleCode[language];
		        editorRef.current.setValue(newValue);
		        setEditorContent(newValue);
		        // Call the parent's change handler if provided
		        if (onEditorChange) {
		          onEditorChange(newValue);
        		}		
			}
		}
	};

	// Handle theme change
	const handleThemeChange = (theme) => {
		if (window.monaco) {
			window.monaco.editor.setTheme(theme);
		}
	};

	if (error) {
		return (
			<div className="w-full h-screen bg-gray-900 text-white flex items-center justify-center">
				<div className="text-center max-w-md">
					<div className="text-red-400 text-xl mb-4">⚠️ Editor Error</div>
					<div className="text-gray-300 mb-4">{error}</div>
					<div className="text-sm text-gray-500">
						Try refreshing the page. If the problem persists, there might be a network issue loading the editor.
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-screen bg-gray-900 text-white">
			{/* Header with controls */}
			<div className="bg-gray-800 p-4 border-b border-gray-700">
				<div className="flex items-center justify-between flex-wrap gap-4">
					<div className="flex items-center space-x-4">
						<h1 className="text-xl font-bold">Code Editor</h1>
						<div className="flex items-center space-x-2">
							<label className="text-sm text-gray-300">Language:</label>
							<select
								value={selectedLanguage}
								onChange={(e) => handleLanguageChange(e.target.value)}
								className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500">
								{languages.map((lang) => (
									<option key={lang.id} value={lang.id}>
										{lang.name}
									</option>
								))}
							</select>
						</div>
						<div className="flex items-center space-x-2">
							<label className="text-sm text-gray-300">Theme:</label>
							<select
								onChange={(e) => handleThemeChange(e.target.value)}
								className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
								defaultValue="vs-dark">
								<option value="vs-dark">Dark</option>
								<option value="vs">Light</option>
								<option value="hc-black">High Contrast</option>
							</select>
						</div>
					</div>
					<div className="text-sm text-gray-400">
						Lines: {editorContent.split("\n").length} | Characters: {editorContent.length}
					</div>
				</div>
			</div>

			{/* Editor Container */}
			<div className="h-full relative">
				{isLoading && (
					<div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
						<div className="text-center">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
							<div className="text-gray-300">Loading Monaco Editor...</div>
							<div className="text-sm text-gray-500 mt-2">Loading from CDN...</div>
						</div>
					</div>
				)}
				<div ref={monacoEl} className="w-full h-full" style={{ height: "calc(100vh - 80px)" }} />
			</div>
		</div>
	);
};

export default MonacoEditor;
