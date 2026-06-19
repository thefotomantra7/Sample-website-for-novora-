/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StoryStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  fullStory: string;
  gemstoneStatus: string;
  duration: string;
}

export interface CollectionItem {
  id: string;
  name: string;
  category: string;
  price: string;
  carat: string;
  clarity: string;
  cut: string;
  image: string;
  features: string[];
}

export interface CustomJewelState {
  style: 'platinum' | 'gold' | 'rose';
  cut: 'round' | 'emerald' | 'princess' | 'oval';
  carat: number;
  clarity: 'FL' | 'VVS1' | 'VS1' | 'SI1';
  ringType: 'solitaire' | 'halo' | 'pave' | 'three-stone';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  date: string;
  verified: boolean;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: string;
  comments: string;
  caption: string;
}

export interface ConsultationSubmission {
  name: string;
  phone: string;
  email: string;
  city: string;
  interestedProduct: string;
  budgetRange: string;
  message: string;
}
