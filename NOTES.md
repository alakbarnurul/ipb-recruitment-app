### List of Setup

1. Setup Next.js - Material UI
2. Setup jsconfig.json
3. Setup ESlint and Prettier
4. Setup Husky

### Main Stacks

1. Next.js
2. Material UI
3. Formik - Yup
4. Zustand
5. SWR - Axios

### Prisma Queries

1. Cara memunculkan data semua Campaigns miliknya.

```jsx
const data = await prisma.organization.findMany({
    where: {
      id: id,
    },
    include: {
      campaigns: true,
    },
})`
```
