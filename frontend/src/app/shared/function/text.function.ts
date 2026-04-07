

export class TextFunction {


    /**
     * Reemplaza los guiones por espacios en un texto dado.
     * @param text 
     * @returns 
     */
    static normalizeDashText(text: string): string {
        return text.replace(/-/g, ' ');
    }


    /**
     * Capitaliza la primera letra de un texto dado.
     * @param text 
     * @returns 
     */
    static capitalizeFirstLetter(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}