'use client';
// Direction 3 — Artisan Collective: FAQ accordion.
// Terracotta chevron, Cormorant questions, all content preserved.

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const D3 = {
  walnut:     '#2c2416',
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

const faqs = [
  { question: 'When does the Hub open?', answer: 'We are targeting a Grand Opening in Q1–Q2 2027 in downtown Las Cruces, New Mexico. Pre-register for the Cider Club or sign up for our newsletter to be the first to hear when we announce the exact date.' },
  { question: 'What cuisines will be available?', answer: 'The Hub will feature 10–13 distinct food concepts: traditional New Mexican, Mexican street food, Southern BBQ, Mediterranean and plant-forward cuisine, Asian fusion and ramen, desserts and baked goods, and 2–3 rotating incubator stalls showcasing emerging local chefs. Every visit offers something new.' },
  { question: 'What is the Cider Club and how do I join?', answer: 'The Cider Club is our tiered monthly membership — Taster ($25/mo) for tasting flights and discounts, Enthusiast ($45/mo) for reserved seating and producer events, and Founding Member ($85/mo) for unlimited flights, a private-label seasonal bottle, and quarterly pairing dinners. Visit our Cider Club page to sign up before we open.' },
  { question: 'How do I apply for a vendor or incubator stall?', answer: 'Incubator stalls start at $2,000–$2,500/month and include a private, fully equipped commercial kitchen. Every vendor receives weekly coaching, NMED permitting guidance, POS training, and a clear three-stage pathway from concept to independence. 70% of stalls are reserved for first-time, minority, veteran, or immigrant entrepreneurs. Apply on our Vendors page.' },
  { question: 'Where exactly will the Hub be located?', answer: 'The Hub will be located in downtown Las Cruces within a zoning area designated as Urban Character under the Realize Las Cruces 2025 Zoning Code — directly within an active MRA zone. The exact address will be announced once the lease is executed.' },
  { question: 'How can I invest or provide grant funding?', answer: 'The Hub is seeking $1,505,000 in total project capital through an SBA 7(a) loan and 