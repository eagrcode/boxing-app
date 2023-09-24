# FightX

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Issues](#Issues)


## Introduction

FightX is a solution to a problem I was having in the gym. When practicing my daily heavy bag workouts, I found myself getting stuck doing the same moves over and over again. I needed a solution that could take away the guess work and provide me with a quick and structured way to perform my workouts.

## Technologies Used

In this portfolio, I've utilized various technologies and tools, including:

- HTML5
- CSS3
- Sass
- JavaScript
- TypeScript
- React
- Next.js
- Supabase
- Vercel

## Features

The **FightX** app showcases the following features:

- Interval timer featuring automatic random combo generation.
- Live feed of workouts posted by other users.
- Run users workouts
- Social media interactions.
- Create and share you own workouts for others to try.
- Responsive design (mobile version recommended).

## Issues

- Auth sign-up flow isn't behaving as expected. The auth/callback is supposed to do a code exchange and authenticate the user, but the redirect times out. Upon checking logs in the callback file I noticed the code isn't being recieved. After some research I discovered many others are also having the same issue specifically with Next.js app router and the supabase callback code exchange. 

## My Considerations

Overall, I am happy with how the foundations of this project turned out, with the exception of a few things.

- Server actions for social media interactions. The response time is too slow, users need to see the result of their interactions instantly. The issue with this particular example was due to supabase limitations. It is my understanding that supabase doesn't currently support multiple realtime subscriptions to the same table. 
