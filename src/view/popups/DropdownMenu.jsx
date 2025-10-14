import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAction = (action) => {
        console.log(`${action} clicked`);
        setIsOpen(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative" style={{width:'150px'}} ref={dropdownRef}>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    aria-label="More options"
                >
                    <MoreHorizontal className="w-6 h-6 text-gray-700" />
                </div>

                {isOpen && (
                    <div className="col col-left absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
                        <div
                            onClick={() => handleAction('Edit Profile')}
                            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Edit Profile
                        </div>
                        <div
                            onClick={() => handleAction('Send Login')}
                            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Send Login
                        </div>
                        <div
                            onClick={() => handleAction('Delete')}
                            className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                        >
                            Delete
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}