
# PocketPlayground: Anti-Addiction Features - Wireframes & Flows

This document outlines the user interface, microcopy, and user flows for the new suite of anti-addiction features. It also includes the A/B testing matrix, ethical guidelines, and sample analytics queries.

---

## A. Wireframes & Microcopy

### 1. Intent Gate

**Description**: A modal dialog that appears immediately upon opening the app, forcing the user to state their intention for the session.

**Layout**:
- A full-screen modal with a blurred background of the main app.
- A prominent title.
- Three large, distinct buttons.
- A small, muted "Just browsing" link at the bottom.

**Microcopy**:
- **Title**: "How would you like to use your time?"
- **Button 1**:
    - **Title**: "Quick 5-Min Break"
    - **Subtitle**: "A short, focused session to recharge."
- **Button 2**:
    - **Title**: "Learn Something New"
    - **Subtitle**: "Engage with Curiosity Bites & Challenges."
- **Button 3**:
    - **Title**: "Creative Warm-up"
    - **Subtitle**: "Spark your imagination with a creation task."
- **Link**: "I'm not sure, just let me browse" (This initiates a `passive` session).

**Onboarding Snippet** (shown once to new users):
- A small tooltip pointing to the modal: "Welcome! To help you get the most out of your time, we start each session with a goal."

### 2. Fixed-Time Sessions & Auto-stop

**Description**: A visible timer and a friction-based extension system.

**UI Elements**:
- **Timer UI**: A small, pill-shaped element in the main header, e.g., `[ ⏱️ 04:32 ]`.
- **End-of-Session Modal**: A friendly, non-intrusive modal that slides up from the bottom.

**Microcopy**:
- **Modal Title**: "Your 5-minute break is up!"
- **Modal Body**: "Taking breaks is key to staying sharp. We hope this was a refreshing pause in your day."
- **Primary Button**: "Finish For Now" (closes app or takes to a summary screen).
- **Secondary Button**: "Add 5 More Minutes (1/2 left today)" (This button is disabled if the user has no extensions left).

### 3. Novelty Budget Counter

**Description**: A visual indicator of the user's remaining "premium" or highly novel experiences for the day.

**UI Element**:
- A small icon and number in the main header, next to the timer. e.g., `[ 💎 8/10 ]`
- When a user tries to start an experience costing more tokens than they have, the "Start" button is replaced with a message.

**Microcopy**:
- **Tooltip on hover**: "Novelty Gems are used for high-intensity games and creative tools. They recharge every few hours."
- **Insufficient Gems Message**: "Needs 2 💎. More gems will be available in 2 hours."

### 4. Badge Card & Profile UI

**Description**: A section in the user's profile to display their achievements.

**Layout**:
- A new "Progress" tab in the user profile.
- A summary section at the top showing total XP per skill (`Focus: 1,250 XP`, `Creativity: 980 XP`).
- A grid of earned badges below. Unearned badges are shown as silhouettes.

**Badge Card UI**:
- A 1:1 aspect ratio card.
- A central piece of artwork (based on `artwork_description`).
- **Title**: e.g., "Creative Spark"
- **Description**: "Completed 5 Micro-creation challenges."
- **Timestamp**: "Earned: Oct 26, 2023"
- A "Share" button that generates a pre-formatted image.

### 5. Reflection Prompt Dialog

**Description**: A weekly modal to encourage metacognition about app usage.

**Layout**:
- A simple, centered modal.
- A title, personalized insight text, and a single "Got it" button.

**Microcopy**:
- **Title**: "Your Weekly Insight"
- **Example Insight 1**: "This week, you spent most of your time on `Microgames`. On a scale of 1-5, how energized did this leave you feeling?" (Includes a simple 1-5 rating input).
- **Example Insight 2**: "You completed 3 `Wellness` challenges this week! It looks like you're building a great habit of taking healthy breaks."
- **Button**: "Thanks for the insight!"

### 6. Guided Transition Tool Modal

**Description**: A full-screen "cool-down" experience triggered at the end of a session.

**Layout**:
- A full-screen overlay with a slow, calming animated gradient (e.g., dark blue to purple).
- Centered text and a play button for the audio.

**Microcopy**:
- **Title**: "Let's Wind Down"
- **Body**: "Take a moment to transition back to your day. Press play for a short guided audio exercise."
- **Button**: A large Play icon.

**Audio Script (first 30s)**:
> (Calm, gentle voice over soft ambient music)
> "Find a comfortable position, and gently close your eyes. Take a slow, deep breath in... and now, a long, full breath out. You've just spent some time in a digital space. Now, let's bring our awareness back to the room around us. Notice the feeling of the chair beneath you... the temperature of the air on your skin. Wiggle your fingers and toes. You are present, here and now. When you're ready, slowly open your eyes. Carry this calm with you into the rest of your day."

---

## C. Example Analytics Dashboard Queries

**1. Intentional Session Rate (ISR)**
- **Goal**: Measure the adoption of the Intent Gate.
- **Query**: `SELECT (COUNT(CASE WHEN start_type = 'intent' THEN 1 END) * 100.0 / COUNT(*)) AS intentional_session_rate FROM sessions WHERE start_ts > 'YYYY-MM-DD';`
- **Success**: ISR > 60% for the general user base.

**2. Satiation Swap Rate (SSR)**
- **Goal**: Measure the effectiveness of the satiation nudge.
- **Query**: `SELECT (COUNT(a.session_id) * 100.0 / COUNT(b.session_id)) AS swap_rate FROM analytics_events a JOIN analytics_events b ON a.session_id = b.session_id WHERE a.eventName = 'satiation_nudge_accepted' AND b.eventName = 'satiation_nudge_shown';`
- **Success**: SSR > 15%.

---

## E. A/B Test Matrix

| Experiment | Hypothesis | Group A (Control) | Group B (Variant) | Primary Metric |
| :--- | :--- | :--- | :--- | :--- |
| **1. Intent Gate** | Making users state an intent will lead to shorter, more focused sessions. | No Intent Gate. | Intent Gate is mandatory. | Avg. Session Duration |
| **2. Session Timer** | A strict timer with friction will reduce overall daily usage time without harming retention. | Easy session extension (1 click). | Friction modal with limited extensions. | Daily Time in App |
| **3. Novelty Budget** | Making novelty a scarce resource will increase its perceived value and drive monetization. | All content is free. | Novelty Gem system enabled. | Premium Content Engagement Rate |
| **4. Reward Consolidation**| Delaying rewards into a daily chest will reduce session length and instant gratification seeking. | Rewards are granted instantly. | All rewards are collected in a daily chest. | Avg. Experiences per Session |
| **5. Satiation Nudge** | Proactively suggesting a category shift will increase content variety per user. | No nudge. | Satiation detector is active. | Avg. Categories Viewed per Week |
| **6. Onboarding** | Explicitly explaining the "why" behind these features will increase their acceptance. | Features enabled without explanation. | 3-step onboarding flow explaining mindful usage. | Feature Opt-out Rate |

---

## G. Edge Cases & Ethics

- **Opt-Out**: Users must be able to disable "Mindful Features" (Intent Gate, Timers) in the settings. This should be a single toggle. The app should remember this choice. Passive analytics will still run.
- **Minors**: For users identified as under 18, session limits should be stricter (e.g., 1 extension per day), social features (duels) should be disabled, and data collection minimized.
- **Physical Challenges**: Any experience with a `physical_activity` flag must display a non-dismissible warning on the instruction screen: "Safety first! Please be aware of your surroundings and only perform this challenge if you are able."
- **Data Portability**: Users must have a "Download My Data" button in settings that exports their session history, XP, and badges as a JSON file, per GDPR. A "Delete Account" button must perform a full data wipe.
- **Offline Mode**: If the app is opened offline, the Intent Gate cannot create a server session. The app should default to a limited "offline mode" with a few pre-loaded, `novelty_cost: 0` experiences. No progress will be saved.

