

export class TextFunction {


    /**
     * Capitaliza la primera letra de un texto dado.
     * @param text 
     * @returns 
     */
    static capitalizeFirstLetter(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}