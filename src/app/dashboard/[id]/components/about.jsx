import React, { useState, useEffect } from 'react';
import { Edit3, Save, X, Check } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../../../firebase';

export default function EditableAboutSection({ about }) {
    const [showAbout, setShowAbout] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [aboutText, setAboutText] = useState(null);
    const [tempText, setTempText] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = () => {
        setTempText(aboutText);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setTempText("");
        setIsEditing(false);
    };

    useEffect(() => {
        setAboutText(about)
    }, [about])

    const saveAboutToDatabase = async (text) => {
        const id = localStorage.getItem("sessionId");

        try{
            const docRef = doc(firestore, "users", id);
    
            const data = {
                about: text,
            }
    
            await updateDoc(docRef, data)
        } catch (error) {
            console.log("Error saving about section:", error);
        }
        
    }

    const handleSave = async () => {
        setIsSaving(true);

        // Simulate API call to save to database
        await new Promise(resolve => setTimeout(resolve, 1000));

        setAboutText(tempText);
        setIsEditing(false);
        setIsSaving(false);

        await saveAboutToDatabase(tempText);
    };

    return (
        <div className="bg-white/10 backdrop-blur-md px-7 py-6 rounded-xl max-w-[530px] border border-white/20 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">About</h3>
                    {!isEditing && showAbout && (
                        <button
                            onClick={handleEdit}
                            className="p-1.5 hover:bg-white/10 rounded-md transition-colors duration-200 group"
                            title="Edit about section"
                        >
                            <Edit3 size={16} className="text-white/70 group-hover:text-white" />
                        </button>
                    )}
                </div>

                <button
                    onClick={() => setShowAbout(!showAbout)}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 px-2 py-1 rounded hover:bg-white/10"
                >
                    {showAbout ? "Hide" : "Show"}
                </button>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAbout ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="space-y-4">
                    {!isEditing ? (
                        <div className="group">
                            <p className="text-white/90 leading-relaxed">
                                {aboutText || "No information provided yet. Click the edit button to add your about section."}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <textarea
                                value={tempText}
                                onChange={(e) => setTempText(e.target.value)}
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent resize-none min-h-[120px] backdrop-blur-sm"
                                placeholder="Tell us about yourself..."
                                rows={5}
                            />

                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-3 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200"
                                    disabled={isSaving}
                                >
                                    <X size={14} />
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSave}
                                    disabled={isSaving || tempText.trim() === ""}
                                    className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={14} />
                                            Save
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}