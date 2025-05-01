# User Activity Tracker

- **Project:** Create a tool to track and visualize user activity, such as time spent on different pages, interactions, and engagement metrics.
- **Details:**
  - Implement real-time web analytics with a transparent social proof verification.
  - Set up a dashboard and backend server to monitor and display real-time website activity.

inpiration: ![hotjar](https://www.hotjar.com/)
just start the writing code for application
create a smooth landing page, do whatever you want but don't completely reply on
gpt

so basically what is done:
29.04.2025
- initialised ui
- homepage done
- created `/track` endpoint for more info
- login and signup ui initialised, see for now logic

what to do next:

01.05.2025
- Implement authentication, just make a single user, no bs
- then the user has the ability to setup a service
- the service is like-> site to maintain; email of on call engineers based on time
- list all the services with some info like visitor stats, traffic etc


2. **Tracking Script**
   - Build a client-side `track.js` script to log page views, time, clicks.
   - Send data to `/api/track`.
3. **Backend API**
   - Create `POST /api/track` to receive and store analytics events.
   - Use `GET /api/stats` to fetch aggregated data.
4. **Real-Time Handling**
   - Integrate WebSockets to push live updates to the dashboard.
   - Optionally use Redis pub/sub for scaling.
5. **Database Setup**
   - Use PostgreSQL or SQLite.
   - Tables: `sessions`, `events`, `pages`.
6. **Dashboard**
   - Create a `/dashboard` route to show live metrics.
   - Use charts and badges to show active users, engagement, etc.
7. **Social Proof**
   - Display real-time counters like “57 websites tracked today”.
   - Pull from backend `/api/stats`.

Maintain the ui across the site, don’t loose control and patience

01.05.2025
spin up a sample db via docker-compose, db available at: `postgresql://postgres:postgres@localhost:5432/nextauth`

initialise the prisma, put db link into `.env`; update the schema, migrate it->
`npx prisma migrate dev --name init`

init the logic for prisma-> done with `prisma client`
