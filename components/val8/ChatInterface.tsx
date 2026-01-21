"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Compass, Plane, Search, Mic } from 'lucide-react';
import { useVal8, HotelCard } from './Val8Context';
import { CardStack } from './CardStack';
import { ChatCarousel } from './ChatCarousel';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { TOP_ATTRACTIONS, UPCOMING_EVENTS } from '@/data/recommendations';

const INITIAL_HOTELS: HotelCard[] = [
  {
    id: '1',
    name: 'Atlantis The Royal',
    location: 'Palm Jumeirah, Dubai',
    price: '$850',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    tags: ['Ultra Luxury', 'Ocean View', 'Gastronomy']
  },
  {
    id: '2',
    name: 'Burj Al Arab',
    location: 'Jumeirah Beach, Dubai',
    price: '$1,200',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    tags: ['Iconic', 'Private Beach', 'Butler Service']
  },
  {
    id: '3',
    name: 'One&Only The Palm',
    location: 'Palm Jumeirah, Dubai',
    price: '$950',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1571896349842-6e5c48dc52e3?auto=format&fit=crop&q=80&w=800',
    tags: ['Secluded', 'Spa', 'Michelin Dining']
  }
];

const MODERN_HOTELS: HotelCard[] = [
  {
    id: '4',
    name: 'ME Dubai by Zaha Hadid',
    location: 'Business Bay, Dubai',
    price: '$450',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    tags: ['Design', 'Modern', 'City Views']
  },
  {
    id: '5',
    name: 'Address Sky View',
    location: 'Downtown Dubai',
    price: '$600',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
    tags: ['Infinity Pool', 'Skyline', 'Shopping']
  }
];

export const ChatInterface: React.FC = () => {
  const { chatHistory, addMessage, userIntent, setUserIntent, setSelectedHotel, setBookingState, isDemoMode, demoStep, setDemoStep, demoPhase, setDemoPhase, isExpanded, setView } = useVal8();
  const { speak, stop } = useTextToSpeech();
  const [inputValue, setInputValue] = useState('');
  const [cards, setCards] = useState<HotelCard[]>(INITIAL_HOTELS);
  const [hasShownCards, setHasShownCards] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Stop audio when widget closes or demo mode ends
  useEffect(() => {
    if (!isExpanded || !isDemoMode) {
      stop();
    }
  }, [isExpanded, isDemoMode, stop]);

  // Demo Script for Visit Dubai - 8 Step Conversation
  const DEMO_SCRIPT = [
    {
      userText: "I'm planning a trip to Dubai.",
      aiResponse: "Excellent choice. When are you planning to travel?",
      nextStep: 1
    },
    {
      userText: "June 5th to 9th.",
      aiResponse: "Noted. Weather is expected to be 95° and sunny. Let's start with flights. I found an early AM departure from SFO on your preferred carrier, Emirates, Business Class, nonstop. Want me to hold seats?",
      nextStep: 2
    },
    {
      userText: "Yes.",
      aiResponse: "Done. I'd recommend The Royal Mirage for your stay. Arabian Court Suite with Sea View. Secure it?",
      nextStep: 3
    },
    {
      userText: "Secure it.",
      aiResponse: "Locked in. Complimentary Chauffeur-drive service is included with your flight. Shall I schedule the pickup?",
      nextStep: 4
    },
    {
      userText: "Yes, schedule it.",
      aiResponse: "Confirmed. For dining, I've found a table at Ossiano — underwater fine dining. Friday at 8pm?",
      nextStep: 5
    },
    {
      userText: "That sounds amazing. Book it.",
      aiResponse: "Reserved. Also — high SPF sunscreen is recommended for the desert sun. Shall I have SunSport SPF 50 waiting in your suite?",
      nextStep: 6
    },
    {
      userText: "Yes please.",
      aiResponse: "Added. Finally, a private desert safari with vintage Land Rovers is highly rated. Shall I add this experience?",
      nextStep: 7
    },
    {
      userText: "Yes, add it.",
      aiResponse: "Done. Your Dubai itinerary is fully organized. Please review the summary below and complete your checkout.",
      nextStep: 8
    }
  ];

  const runDemoStep = async () => {
    if (demoStep >= DEMO_SCRIPT.length) return;

    setDemoPhase('typing'); // PHASE: TYPING
    const step = DEMO_SCRIPT[demoStep];

    // Simulate typing
    let currentText = "";
    for (let i = 0; i < step.userText.length; i++) {
      await new Promise(r => setTimeout(r, 40));
      currentText += step.userText[i];
      setInputValue(currentText);
    }

    await new Promise(r => setTimeout(r, 400));

    // "Send" the message
    setInputValue('');
    addMessage({
      sender: 'user',
      text: step.userText,
      type: 'text'
    });
    setDemoPhase('processing'); // PHASE: PROCESSING (Card should appear now)

    // AI Response (with slight delay for "thinking")
    setTimeout(() => {
      setDemoPhase('responding'); // PHASE: RESPONDING
      addMessage({
        sender: 'val8',
        text: step.aiResponse,
        type: 'text'
      });

      // Speak the response and advance ONLY when done
      speak(step.aiResponse, () => {
        // Small pause after speaking before next step triggers to simulate human reaction time
        setTimeout(() => {
          setDemoPhase('idle'); // PHASE: IDLE
          if (step.nextStep !== undefined) {
            setDemoStep(step.nextStep);
          }
        }, 500);
      });

    }, 1200);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Auto-run demo steps (DISABLED for Manual Mode)
  /*
  useEffect(() => {
    if (isDemoMode && demoStep < DEMO_SCRIPT.length) {
      // Voice callback handles the "wait for speech", so we just need a tiny functional delay/debounce
      // This timer essentially "starts" the next user action simulation
      const delay = 300;

      const timer = setTimeout(() => {
        runDemoStep();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isDemoMode, demoStep]);
  */

  const handleSend = () => {
    if (isDemoMode) {
      // Demo Mode: Accept any input and proceed with the scripted response
      if (!inputValue.trim()) return;

      // Prevent sending while AI is still responding/speaking
      if (demoPhase !== 'idle') {
        return;
      }

      const currentStep = DEMO_SCRIPT[demoStep];
      if (!currentStep) return; // No more steps

      // Proceed with the demo - use user's actual input, respond with script
      setDemoPhase('typing');
      const userMessage = inputValue.trim();
      setInputValue('');

      addMessage({
        sender: 'user',
        text: userMessage, // Show what user actually typed
        type: 'text'
      });
      setDemoPhase('processing');

      // Trigger AI Response Sequence
      setTimeout(() => {
        setDemoPhase('responding');
        addMessage({
          sender: 'val8',
          text: currentStep.aiResponse,
          type: 'text'
        });

        speak(currentStep.aiResponse, () => {
          setTimeout(() => {
            setDemoPhase('idle');
            if (currentStep.nextStep !== undefined) {
              setDemoStep(currentStep.nextStep);
            }
          }, 500);
        });
      }, 1000);
      return;
    }

    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');

    // Add user message
    addMessage({
      sender: 'user',
      text: userText,
      type: 'text',
    });

    // Handle "hi" or "hello"
    if (['hi', 'hello', 'hey'].includes(userText.toLowerCase())) {
      setTimeout(() => {
        // 1. Greeting
        addMessage({
          sender: 'val8',
          text: "Hello! Welcome to Val8. I can help you discover the best of Dubai.",
          type: 'text'
        });

        // 2. Attractions
        setTimeout(() => {
          addMessage({
            sender: 'val8',
            text: "Explore Top Attractions",
            type: 'card-stack',
            cards: TOP_ATTRACTIONS
          });
        }, 800);

        // 3. Events
        setTimeout(() => {
          addMessage({
            sender: 'val8',
            text: "Upcoming Events",
            type: 'card-stack',
            cards: UPCOMING_EVENTS
          });
        }, 1600);

        // 4. See All Button
        setTimeout(() => {
          addMessage({
            sender: 'val8',
            text: "Would you like to explore more?",
            type: 'options',
            options: ['< > View All Cards'] // Using special label for the button
          });
        }, 2400);

      }, 500);
      return;
    }

    // FRAME 7: Modification Loop Logic
    if (hasShownCards) {
      // Simulate "thinking" and refining
      setTimeout(() => {
        addMessage({
          sender: 'val8',
          text: "Absolutely — here are a few more sleek, modern properties with exceptional views.",
          type: 'text',
        });

        // Swap cards
        setTimeout(() => {
          setCards(MODERN_HOTELS);
          addMessage({
            sender: 'val8',
            text: "I've updated the selection for you.",
            type: 'card-stack',
          });
        }, 800);
      }, 1000);
      return;
    }

    // Default flow (Frame 4)
    if (!userIntent) {
      setUserIntent('planning');
      setTimeout(() => {
        addMessage({
          sender: 'val8',
          text: "Beautiful choice. Dubai is incredible in December — warm, glamorous, and full of great experiences. Are you looking for something more relaxing, adventure-focused, or social?",
          type: 'options',
          options: ['Relaxing', 'Adventure', 'Social', 'Not sure']
        });
      }, 1000);
    }
  };

  const handleQuickAction = (action: string) => {
    if (isDemoMode) return; // Disable quick actions in demo mode

    addMessage({
      sender: 'user',
      text: action,
      type: 'text',
    });
    setUserIntent('planning');

    // Logic to trigger Card Stack (Frame 5 -> 6)
    if (['Relaxing', 'Adventure', 'Social'].includes(action)) {
      setTimeout(() => {
        addMessage({
          sender: 'val8',
          text: "Got it. I'll focus on ocean-view suites and peaceful stays. Here are a few options I curated for you.",
          type: 'card-stack',
        });
        setHasShownCards(true);
      }, 1500);
    } else if (action === '< > View All Cards') {
      // Handle "See All" action - for now, we can show a text message or trigger a dashboard view.
      setTimeout(() => {
        addMessage({
          sender: 'val8',
          text: "Here are all the recommendations.",
          type: 'text'
        });
        setView('dashboard');
      }, 500);
    } else {
      // Default response for other actions
      setTimeout(() => {
        addMessage({
          sender: 'val8',
          text: "Excellent. Where are you thinking of going?",
          type: 'text',
        });
      }, 800);
    }
  };

  const handleHotelSelect = (hotel: HotelCard) => {
    setSelectedHotel(hotel);
    setBookingState('summary');
    addMessage({
      sender: 'val8',
      text: `Excellent choice. ${hotel.name} is stunning. I've prepared a trip summary for you.`,
      type: 'text',
    });
  };

  const handleRemoveCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default since we handle it manually
      handleSend();
    }
  };

  // Frame 3: Welcome / Intent Capture
  if (chatHistory.length === 0) {
    return (
      <div className="h-full flex flex-col flex-1">
        <div className="flex-1 flex flex-col justify-end px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-serif text-white mb-8 leading-tight">
              Where are you <br />
              <span className="text-primary italic">thinking of going?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon: MapPin, label: 'Plan a Trip', action: 'I want to plan a trip' },
              { icon: Compass, label: 'Explore Ideas', action: 'Inspire me' },
              { icon: Plane, label: 'Traveling Now', action: 'I am traveling now' },
              { icon: Search, label: 'Just Browsing', action: 'Just browsing' },
            ].map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                onClick={() => handleQuickAction(item.action)}
                className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-xl transition-all group"
              >
                <item.icon className="w-5 h-5 text-white/60 group-hover:text-primary mb-2 transition-colors" />
                <span className="text-xs text-white/80 font-light">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input Area (Shared - Unified Style) */}
        <div className="p-4 bg-transparent border-t border-white/10">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={demoPhase !== 'idle' ? "Listening..." : "Tell me anything..."}
              disabled={demoPhase !== 'idle'}
              className={`w-full bg-white/5 text-white placeholder-white/40 rounded-xl pl-4 pr-20 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-white/10 transition-all backdrop-blur-md ${demoPhase !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-primary hover:bg-white/10 transition-colors"
                title="Voice input"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || demoPhase !== 'idle'}
                className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-light transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Frame 4+: Chat Interface
  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex-1 px-8 pt-6 pb-2 overflow-y-auto no-scrollbar space-y-6">
        {chatHistory.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.type === 'text' ? (
              <div
                className={`max-w-[85%] p-4 rounded-2xl ${msg.sender === 'user'
                  ? 'bg-white/10 text-white rounded-tr-sm backdrop-blur-md border border-white/20'
                  : 'bg-primary/20 text-white rounded-tl-sm border border-primary/30'
                  }`}
              >
                <p className="text-sm leading-relaxed font-light">{msg.text}</p>
              </div>
            ) : msg.type === 'options' ? (
              <div key={msg.id} className="flex flex-wrap gap-2 mb-6 pl-4">
                {msg.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuickAction(option)}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/20 text-xs text-white/80 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : msg.type === 'card-stack' ? (
              <div className="w-full">
                <div className="text-white/80 border-l border-white/20 pl-4 p-4 text-sm font-light mb-2">
                  {msg.text}
                </div>
                {/* Render Carousel or Stack based on content preference */}
                {(msg.type === 'card-stack' && msg.cards && (msg.cards[0]?.type === 'attraction' || msg.cards[0]?.type === 'event')) ? (
                  <ChatCarousel
                    cards={msg.cards}
                    type={msg.cards[0]?.type as 'attraction' | 'event'}
                    onSelect={handleHotelSelect}
                  />
                ) : (msg.type === 'card-stack' && msg.cards) ? (
                  <CardStack cards={msg.cards} onSelect={handleHotelSelect} />
                ) : null}

                {/* Fallback for legacy messages using global cards state (if any) */}
                {(msg.type === 'card-stack' && !msg.cards && i === chatHistory.length - 1) && (
                  <CardStack cards={cards} onSelect={handleHotelSelect} onRemove={handleRemoveCard} />
                )}
              </div>
            ) : null}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-transparent border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={demoPhase !== 'idle' ? "Listening..." : "Tell me anything..."}
            disabled={demoPhase !== 'idle'}
            className={`w-full bg-white/5 text-white placeholder-white/40 rounded-xl pl-4 pr-20 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-white/10 transition-all backdrop-blur-md ${demoPhase !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              type="button"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-primary hover:bg-white/10 transition-colors"
              title="Voice input"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="submit"
              disabled={!inputValue.trim() || demoPhase !== 'idle'}
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-light transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
