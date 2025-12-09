"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MOCK_MESSAGES,
  MOCK_CLINIC_USER,
  MOCK_TENANT_USER,
} from "@/lib/mockData";
import { format } from "date-fns";
import Image from "next/image";

// Mock multiple tenants for the clinic view
const MOCK_CONVERSATIONS = [
  {
    id: MOCK_TENANT_USER.id,
    name: MOCK_TENANT_USER.name,
    avatar: MOCK_TENANT_USER.avatar,
    lastMessage: "Thank you for the update.",
    lastMessageTime: new Date().toISOString(),
    unread: 0,
  },
  {
    id: "tenant-2",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?u=tenant-2",
    lastMessage: "I uploaded the lease document.",
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
    unread: 2,
  },
  {
    id: "tenant-3",
    name: "Michael Brown",
    avatar: "https://i.pravatar.cc/150?u=tenant-3",
    lastMessage: "When can we schedule a call?",
    lastMessageTime: new Date(Date.now() - 86400000).toISOString(),
    unread: 0,
  },
];

export default function ClinicMessagesPage() {
  const [selectedTenantId, setSelectedTenantId] = useState<string>(
    MOCK_TENANT_USER.id,
  );
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter messages for the selected conversation
  const conversationMessages =
    selectedTenantId === MOCK_TENANT_USER.id
      ? MOCK_MESSAGES.filter(
          (m) =>
            (m.senderId === MOCK_CLINIC_USER.id &&
              m.receiverId === selectedTenantId) ||
            (m.senderId === selectedTenantId &&
              m.receiverId === MOCK_CLINIC_USER.id),
        ).sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        )
      : [];

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

  const selectedConversation = MOCK_CONVERSATIONS.find(
    (c) => c.id === selectedTenantId,
  );

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Messages
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Communicate with your clients
        </p>
      </div>

      <div className="flex h-[calc(100vh-240px)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        {/* Sidebar / Conversation List */}
        <div className="w-full border-r border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 md:w-1/3 lg:w-1/4">
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Inbox
            </h2>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Search clients..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
              />
            </div>
          </div>

          <div
            className="overflow-y-auto"
            style={{ height: "calc(100% - 96px)" }}
          >
            {MOCK_CONVERSATIONS.map((tenant) => (
              <button
                key={tenant.id}
                onClick={() => setSelectedTenantId(tenant.id)}
                className={`flex w-full items-center gap-3 border-b border-gray-200 px-4 py-3 transition-colors dark:border-gray-700 ${
                  selectedTenantId === tenant.id
                    ? "bg-primary/10 dark:bg-primary/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image
                    src={tenant.avatar}
                    alt={tenant.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  {tenant.unread > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                      {tenant.unread}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="truncate font-semibold text-gray-900 dark:text-white">
                      {tenant.name}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(tenant.lastMessageTime), "h:mm a")}
                    </span>
                  </div>
                  <p className="truncate text-sm text-gray-600 dark:text-gray-400">
                    {tenant.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex w-full flex-col md:w-2/3 lg:w-3/4">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image
                  src={
                    selectedConversation?.avatar || "https://i.pravatar.cc/150"
                  }
                  alt="Tenant"
                  fill
                  className="rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-800"></span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {selectedConversation?.name}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Active now
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
                  const isClinic = msg.senderId === MOCK_CLINIC_USER.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isClinic ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[70%] gap-2 ${isClinic ? "flex-row-reverse" : "flex-row"}`}
                      >
                        {!isClinic && (
                          <div className="h-8 w-8 flex-shrink-0">
                            <Image
                              src={
                                selectedConversation?.avatar ||
                                "https://i.pravatar.cc/150"
                              }
                              alt="Avatar"
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          </div>
                        )}
                        <div>
                          <div
                            className={`rounded-2xl px-4 py-2.5 ${
                              isClinic
                                ? "bg-primary text-white"
                                : "bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          <p
                            className={`mt-1 text-xs text-gray-500 dark:text-gray-400 ${isClinic ? "text-right" : "text-left"}`}
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
                  <p className="text-gray-500 dark:text-gray-400">
                    No messages yet. Start a conversation!
                  </p>
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
    </div>
  );
}
