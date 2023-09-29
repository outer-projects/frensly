import axios from "axios";
import { useEffect, useState } from "react";
export const twitterUrl = "https://api.twitter.com";
// export const token = 'AAAAAAAAAAAAAAAAAAAAAFnbqAEAAAAACnJNY3frq1PHz3nE2JfSy16g46M%3DB5qaXizp0Tzfa4AqqcEYJCK91pMqrYaG30lkWv9uK0b9JjZzZf'
export const token = btoa(
  "0eHcUQpBLWVP6SYWTGwPoVtlI:6RzkYtuFKy6Xrq3CsgRbSj8cNr4viYdLWpe3fbQXbsqYlFyMu3"
);

export const innerBackend = axios.create({
  baseURL: twitterUrl,
  headers: {
    accept: "application/json",
    Authorization: "Basic " + token,
    "ngrok-skip-browser-warning": "false",
  },
});

