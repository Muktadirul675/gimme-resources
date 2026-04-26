export type AIChunk =
    | { type: "token"; text: string }
    | { type: "done" }
    | { type: "error"; message: string };

export type ChatMessage = {
    role: "user" | "assistant" | "system";
    content: string;
    id: string
};

export type Message = {
    id?: string;
    conversationId?: string;
    role: "user" | "assistant" | "system";

    content: string;

    createdAt?: string;
    updatedAt?: string;

    status?: "streaming" | "done";

    authors?: string[]; // parsed from JSON
    attachments?: any[]; // parsed JSON
};

export type UIMessage = {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    status?: "streaming" | "done";
}

export type DBMessage = {
    id: string;
    conversationId: string;
    role: "user" | "assistant";

    content: string;

    createdAt: string;
    updatedAt: string;

    authors?: string[];
    attachments?: any[];
};

export type Attachment = {
    type: "image" | "file" | "link";
    url: string;
    name?: string;
};
