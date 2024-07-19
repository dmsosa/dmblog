import { RefObject, useEffect, useRef } from "react";

function useOutsideClick(callback: () => void) : RefObject<HTMLDivElement> {
    
    const ref = useRef<HTMLDivElement>(null);
    
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            callback()
        }
    }

    useEffect(() => {
        
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('touchend', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('touchend', handleClickOutside);
        }
    }, [callback]);

    return ref;
}

export default useOutsideClick;