import React,{useEffect} from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from 'next/router';
import {MenuKeys} from "src/core/domain/enums/MenuKeys"


const DashBoardPage = (context: any) => {
    const router = useRouter();
    


    return <div>Dashbord</div>;
    };

export default DashBoardPage;


export async function getServerSideProps(context) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale)),
            defaultSelectedKeys: [MenuKeys.Dashboard],
            openKeys: [],
        },
    };
}