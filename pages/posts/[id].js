import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

import {getAllPostIds,  getPostData} from '../../lib/posts'

export default function Post( {postData}) {
   // console.log('3. Post')
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article> 
              <h1 className={utilStyles.headingXl}>{postData.title}</h1>
              <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
              </div>
              <div dangerouslySetInnerHTML = {{ __html: postData.contentHtml}}></div>
            </article>           
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    //console.log('1. StaticPaths')
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ( {params}) {
    const postData = await getPostData(params.id)
   // console.log(`2. StaticProps paramId is ${params.id}`)
    return {
        props: {
            postData
        }
    }
}