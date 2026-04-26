export function extractCodeBlocks(text: string) {
    const regex = /```([\s\S]*?)```/g;
    const matches = [];
    let match;

    while ((match = regex.exec(text))) {
        matches.push(match[1]);
    }

    return matches;
}

export function extractLinks(text: string) {
    const regex = /(https?:\/\/[^\s]+)/g;
    return text.match(regex) || [];
}