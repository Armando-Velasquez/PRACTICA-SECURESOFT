
const blackList: string[] = ["select", "drop", "delete", "insert", "--"]
const blackList2: string[] = ["<", ">", "script", "onerro", "alert", "onClick"]

function isValidSearch(input: string): boolean {

    input = input.toLowerCase();

    for (let i = 0; i < blackList2.length; i++) {
        if (input.includes(blackList2[i])) {
            return false;
        }
    }

    return true;
}

console.log(isValidSearch("<script>alert('xss')</script>"));

