"use client";

import { useFormState } from "react-dom";
import { createResource } from "./actions";

const initialState = {
    success: false,
    message: "",
};

export default function NewResourcePage() {
    const [state, formAction] = useFormState(createResource, initialState);

    return (
        <div className="max-w-3xl mx-auto p-6 text-white">
            <h1 className="text-2xl font-semibold mb-6">
                Add New Resource
            </h1>

            <form
                action={formAction}
                className="flex flex-col gap-4 bg-[#151922] p-6 rounded-xl border border-slate-700"
            >
                <input name="title" placeholder="Title" className="p-3 rounded bg-[#0f131b] border border-slate-700 outline-none" />

                <textarea
                    name="description"
                    rows={20}
                    required
                    placeholder="Description"
                    className="p-3 rounded bg-[#0f131b] border border-slate-700 h-32 outline-none resize-none"
                />

                <input name="url" placeholder="URL" className="p-3 rounded bg-[#0f131b] border border-slate-700 outline-none" />

                <input name="author" placeholder="Author" className="p-3 rounded bg-[#0f131b] border border-slate-700 outline-none" />

                {/* NEW */}
                <input
                    name="author_pass"
                    type="password"
                    placeholder="Author Pass"
                    className="p-3 rounded bg-[#0f131b] border border-slate-700 outline-none"
                />

                <select name="type" className="p-3 rounded bg-[#0f131b] border border-slate-700">
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="pdf">PDF</option>
                    <option value="video">Video</option>
                    <option value="link">Link</option>
                </select>

                <select name="audience" className="p-3 rounded bg-[#0f131b] border border-slate-700">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                </select>

                <input name="tags" placeholder="Tags" className="p-3 rounded bg-[#0f131b] border border-slate-700 outline-none" />

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 transition p-3 rounded font-medium"
                >
                    Create Resource
                </button>

                {state?.message && (
                    <p className={state.success ? "text-green-400" : "text-red-400"}>
                        {state.message}
                    </p>
                )}
            </form>
        </div>
    );
}