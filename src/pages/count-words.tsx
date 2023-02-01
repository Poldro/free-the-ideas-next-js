import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import LayoutCountWords from "../containers/count-words/layout";

const CountWords: NextPage = () => {

    return(
        <LayoutCountWords>
            <div>hello</div>
        </LayoutCountWords>
    )
}

export default CountWords