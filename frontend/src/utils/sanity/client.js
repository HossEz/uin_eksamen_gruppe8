import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: "foymtwwd",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21"
})

export const writeClient = createClient({
    token: "skAc3Qf3ZPUQKO2fZAUbNW7uzvtcwmXRv0kWdx4aJIapV7sGDcnbe7RAqW9WwI9d7QLMWJZ0c242GbODqxwRXGYlp7b099kLp3TzCh4W3vhyG0xwqDzZ3qaoqaIs73q7hDfDEG6bwLxF03X9RgDlbSnEASQsJFhst5boMiuLWISOzdsZB5w4",
    projectId: "foymtwwd",
    dataset: "production",
    apiVersion: "2021-10-21"
})