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
