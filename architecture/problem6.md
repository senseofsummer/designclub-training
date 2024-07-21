# Scoreboard API 

## Overview

This module handles live updates for a scoreboard, displaying the top 10 user scores. It uses Redis, WebSockets, a message queue, and a database to ensure real-time updates and secure score increment operations.

## Requirements

1. Live updates: The scoreboard must reflect real-time changes.
2. Action-triggered score increment: Users' scores increase upon completing an action.
3. Security: Prevent unauthorized score increments.

## Architecture

### Components

1. Redis: For fast access and storage of scoreboard data.
2. WebSockets: To push live updates to the clients.
3. Message Queue: To handle asynchronous score update requests.
4. Database: For persistent storage of user scores.

### Flow of Execution

1. User Action: A user completes an action.
2. API Call: The client dispatches an API call to update the score.
3. Authorization: The API server verifies the user's authorization.
4. Message Queue: The server pushes the update request to the message queue.
5. Score Update: A worker service processes the queue, updates the score in the database, and updates the scoreboard in Redis.
6. Live Update: The WebSocket server broadcasts the updated scoreboard to all connected clients.

## Endpoints

### POST /update-score

Updates the user's score.

#### Request

{
  "userId": "string",
  "actionId": "string"
}

Flow diagram:

User Action -> API Call -> Authorization -> Message Queue 

                                                |
                                                v

                                            Worker Service 
                                            
                                         /       |
                                        v        v
                                              Database 
Clients <-  WebSocket Server<-   Redis Cache 
                                                
                                           

### Explanation:

1. User Action: The user performs an action that should increase their score.
2. API Call: The client sends a POST request to the `/update-score` endpoint.
3. Authorization: The API server verifies the user's identity and authorization.
4. Message Queue: The API server pushes the score update request to the message queue.
5. Worker Service: The worker service retrieves the message from the queue, updates the score in the database, and updates the Redis cache.
6. Redis Cache: The updated scoreboard is stored in Redis for fast access.
7. WebSocket Server: The WebSocket server listens to changes in the Redis cache and broadcasts the updated scoreboard.
8. Clients: The updated scoreboard is sent to all connected clients via WebSocket.

This textual representation outlines the sequence and flow of operations within the system.