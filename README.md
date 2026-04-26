# 📚 Resource-Focused AI Chatbot

A clean, modern AI chatbot designed to help users discover **high-quality learning resources** instead of overwhelming them with explanations.

This system acts like a **professional digital librarian**, curating and presenting the most relevant resources from a structured knowledgebase.

---

## 🚀 Overview

This chatbot is built with a strong focus on **resource discovery**, not teaching.

Instead of answering questions directly, it:
- Finds the most relevant resources
- Merges related content intelligently
- Presents them in a clean, structured format

The goal is to help users **learn efficiently through curated materials**.

---

## 🧠 Core Concept

The system follows a **RAG (Retrieval-Augmented Generation)** approach:

1. Retrieve relevant resources from the database
2. Merge related entries (text, image, links)
3. Pass structured context to the AI model
4. Generate a clean, professional response

---

## 🗨️ Chat Experience

The chatbot provides a modern AI chat interface with:

- Real-time streaming responses
- Clean markdown rendering
- Auto-scroll with manual override
- Compact, readable message layout
- Smooth typing and loading states

---

## 📁 Resource System

Each resource in the system can include:

- Title
- Description
- Link (optional)
- Media (images or other content)
- Author
- Audience level
- Tags

Resources are designed to be:
- Short (10â20 sentences)
- Focused
- High quality
- Search-friendly

---

## ⏫ Intelligent Resource Merging

The system can handle fragmented data.

If multiple entries represent the same resource (e.g. text + image), the AI:

- Detects similarity
- Merges them into one unified resource
- Avoids duplication in output

This ensures:
- Cleaner responses
- Better user experience
- More meaningful results

---

## 🎯 Relevance & Curation

The chatbot does not dump all available data.

Instead, it:
- Selects only the most relevant resources
- Limits output to a small curated set
- Focuses on quality over quantity

---

## 📄 UI & Rendering

The interface is designed to feel like modern AI tools such as ChatGPT or Gemini.

Features include:
- Styled markdown output
- Compact images
- Clean typography
- Structured headings
- Balanced spacing 

Media is displayed visually without unnecessary descriptions.

---

## 🧩 Backend Architecture

- Session-based conversations using cookies
- PostgreSQL database with structured schemas
- Drizzle ORM for database management
- Streaming AI responses using SSE

---

## 🔎 Embeddings & Search

Each resource includes vector embeddings for semantic search.

This allows:
- Better relevance matching
- Context-aware retrieval
- Improved AI responses

---

## ⚡ Performance & Behavior

The system is designed to be:

- Fast and responsive
- Context-aware
- Consistent in formatting
- Strict in relevance filtering

---

## 🧪 Current Status

The system is approximately **90% complete**, with:

- Chat system fully functional
- Resource model implemented
- RAG pipeline working
- UI polished and responsive

---

## 🚀 Next Steps

Future improvements may include:

- Advanced vector search ranking
- Smarter grouping using embeddings
- Structured UI resource cards
- Enhanced filtering by audience or tags
- Performance optimization for large datasets

---

## 🎯 Purpose

This project aims to provide a **better way to learn** by:

- Reducing noise
- Improving discovery
- Delivering curated knowledge

---

## 🧑‍💻 Final Note

This is not just a chatbot.

It is a **resource discovery engine powered by AI**, designed to guide users toward the best materials instead 