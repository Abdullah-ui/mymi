import React from 'react';

const ExperienceLevel = ({ level }) => {
    const getChipStyles = (experienceLevel) => {
        switch (experienceLevel) {
            case 'beginner':
                return {
                    bg: 'bg-gradient-to-r from-green-400 to-emerald-500',
                    text: 'text-white',
                    shadow: 'shadow-green-200/50',
                    ring: 'ring-green-300/30',
                    icon: '🌱'
                };
            case 'intermediate':
                return {
                    bg: 'bg-gradient-to-r from-blue-400 to-indigo-500',
                    text: 'text-white',
                    shadow: 'shadow-blue-200/50',
                    ring: 'ring-blue-300/30',
                    icon: '⚡'
                };
            case 'advanced':
                return {
                    bg: 'bg-gradient-to-r from-purple-400 to-pink-500',
                    text: 'text-white',
                    shadow: 'shadow-purple-200/50',
                    ring: 'ring-purple-300/30',
                    icon: '🚀'
                };
            default:
                return {
                    bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
                    text: 'text-white',
                    shadow: 'shadow-gray-200/50',
                    ring: 'ring-gray-300/30',
                    icon: '❓'
                };
        }
    };

    const styles = getChipStyles(level);

    return (
        <div className={`
            my-1
      inline-flex items-center gap-x-1 px-2 rounded-md select-none
      ${styles.bg} ${styles.text} ${styles.ring} font-medium text-sm
      border border-white/20
    `}>
            <span className="text-base">{styles.icon}</span>
            <span className="capitalize font-semibold tracking-wide">
                {level}
            </span>
            <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        </div>
    );
};
export default ExperienceLevel