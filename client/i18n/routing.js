import { defineRouting } from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['fa', 'en', 'tr', 'ar'],

    // Used when no locale matches
    defaultLocale: 'fa'
});
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);