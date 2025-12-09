"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MOCK_MESSAGES,
  MOCK_CLINIC_USER,
  MOCK_TENANT_USER,
} from "@/lib/mockData";
import { format } from "date-fns";
import Image from "next/image";

export default function TenantMessagesPage() {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter messages for the tenant's conversation with the clinic
  const conversationMessages = MOCK_MESSAGES.filter(
    (m) =>
      (m.senderId === MOCK_CLINIC_USER.id &&
        m.receiverId === MOCK_TENANT_USER.id) ||
      (m.senderId === MOCK_TENANT_USER.id &&
        m.receiverId === MOCK_CLINIC_USER.id),
  ).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage("");
    // In a real app, this would send the message to the backend
  };

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Messages
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Chat with your legal clinic
        </p>
      </div>

      <div className="flex h-[calc(100vh-240px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src={MOCK_CLINIC_USER.avatar}
                alt={MOCK_CLINIC_USER.name || "Clinic"}
                fill
                className="rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-800"></span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {MOCK_CLINIC_USER.name}
              </h4>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Legal Clinic
              </span>
            </div>
          </div>

          <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 dark:hover:bg-primary/20">
            View Case Details
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6 dark:bg-gray-900">
          <div className="space-y-4">
            {conversationMessages.length > 0 ? (
              conversationMessages.map((msg) => {
                const isTenant = msg.senderId === MOCK_TENANT_USER.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isTenant ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex max-w-[70%] gap-2 ${isTenant ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {!isTenant && (
                        <div className="h-8 w-8 flex-shrink-0">
                          <Image
                            src={MOCK_CLINIC_USER.avatar}
                            alt="Clinic"
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                      )}
                      <div>
                        <div
                          className={`rounded-2xl px-4 py-2.5 ${
                            isTenant
                              ? "bg-primary text-white"
                              : "bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p
                          className={`mt-1 text-xs text-gray-500 dark:text-gray-400 ${isTenant ? "text-right" : "text-left"}`}
                        >
                          {format(new Date(msg.timestamp), "h:mm a")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    No messages yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Start a conversation with your legal clinic
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
