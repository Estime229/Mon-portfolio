import { Container } from "@/ui/components/container/container";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import Image from "next/image";
import { FaFontAwesome, FaLaravel, FaPhp, FaTypo3, FaVuejs } from "react-icons/fa";
import { RiCss3Fill, RiGithubFill, RiHtml5Fill, RiJavascriptFill, RiLinkedinBoxFill, RiLinkedinLine, RiReactjsFill, RiWhatsappFill } from "react-icons/ri";

export const HeroTopView = () => {
    return (

        <Container className="relative pt-48 pb-52 overflow-hidden">
            <div className="w-full max-w-2xl space-y-5">
                <Typography variant="h3" component="h1" className="mx-w-lg">
                    Full-Stack React Developper👋
                </Typography>
                <Typography variant="body-lg" component="p" theme="gray" className="mx-w-xl">
                    Hi, I&apos;m Frédy Gliti. A passionate Front-end React
                    Developper based in Africa, Bénin 🎈
                </Typography>
                <div className="space-x-3 pt-2.5 flex ">
                <RiGithubFill size={40} href=""/>
                <RiLinkedinBoxFill size={40} href="www.linkedin.com/in/estimé-gliti-585260253"/>
                <RiWhatsappFill size={40} href=""/>
                
                </div>

                <div className="space-x-3 pt-40 flex mb-25 py-10 ">
                <Typography variant="h5" component="h3" className="mx-w-lg">
                    Tech Stack
                </Typography>
               
                <div className="space-x-10 flex">
                     <Typography variant="h5" component="h3" theme="gray" className="mx-w-lg ">
                    |
                </Typography>
                <RiHtml5Fill size={40} color="orange" />
                <RiCss3Fill size={40} color="blue" />
                <RiJavascriptFill size={40} color="yellow"/>
                <RiReactjsFill size={40} color="blue"/>
                <FaVuejs size={40} color="green"/>
                <FaLaravel size={40} color="black"/>
               
                
               

               
        
                


                </div>
               
                
                </div>

            </div>
            <Image
                src="/assets/images/profil.png"
                alt="Evolution dev frontend"
                width={580}
                height={50}
                className="absolute top-10 right-20 "
            />

        </Container>
    )
}