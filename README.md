# Booking Simple

Booking Simple is a Nextjs project for guests to select dates and submit a reservation on a property

## Navigation

- [Get started](#get-started)
- [Included](#included)
- [Documentation](#documentation)
- [Contributing](#contributing)

## Get started

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install

```bash
git clone https://github.com/deividmfl/booking-simple
```

navigate to the project

```bash
cd booking-simple
```

install the dependencies

```bash
npm install
```

run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn more

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Included

```text
booking-simple/
└── public/ (Static assets to be served)
└── src/
    ├── app/
    │   ├── book/ (Route segment)
    │   ├──── checkout (Nested route segment)
    │   ├─────── page.tsx (Page)
    │   ├─────── style.tsx (Style)
    │   ├──── my-bookings (Nested route segment)
    │   ├─────── page.tsx (Page)
    │   ├─────── style.tsx (Style)
    │   ├── reservation/ (Nested route segment)
    │   ├──── page.tsx (Page)
    │   ├──── style.tsx (Style)
    │   ├── global.css (Global css)
    │   ├── layout.tsx (Layout)
    │   ├── page.tsx (Home Page)
    ├── components/
    │   ├── **Component name/
    │   ├──── index.tsx (Component)
    │   ├──── style.tsx (Style)
    ├── lib/
    │   ├── slices/ (global state functions)
    │   ├──── createCheckout.tsx
    │   ├──── createPlace.tsx
    │   ├──── createReservation.tsx
    │   ├──── createUser.tsx
    |   ├── store.ts (global state store)
    ├── utils/
    │   ├── helpers.tsx (some helpers functions)
    |   ├── icons.tsx (icons svg exports)
    |   ├── place.json (initial props for reservation/)
    |   ├── place.json (initial props for user)

```

## Documentation

this project uses [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) as a global state, so to add another state you will need to export this at lib/store.ts

```javascript

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { createUserSlice, UserSlice } from './slices/createUser'
import { createPlaceSlice, PlaceSlice } from './slices/createPlace'
import { createCheckoutSlice, CheckoutSlice } from './slices/createCheckout'
import { createReservationSlice, ReservationSlice } from './slices/createReservation'

'your import'


type State = UserSlice & PlaceSlice & CheckoutSlice & ReservationSlice '& your import'

export const useAppStore = create<State>()(persist((...state) => ({
    ...createUserSlice(...state),
    ...createPlaceSlice(...state),
    ...createCheckoutSlice(...state),
    ...createReservationSlice(...state),
    '...your import'
}),{
    name: 'bookingSimple',
    storage: createJSONStorage(() => sessionStorage)
}))
```

see more examples at [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
