import { Container } from "@/ui/components/container/container";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import { LinkTypes } from "@/lib/link-type";
import Image from "next/image";
import { RiMailAddFill, RiMailCheckLine, RiMailFill, RiMap2Fill, RiMapPin2Fill, RiUserLocationFill } from "react-icons/ri";

export const CallToActionView = () => {
    return (
        <div className="relative " id="CONTACT">
            <Container className="py-10">
                <div className="relative z-10 max-w-3xl space-y-10" >
                    <Typography variant="h5" theme="primary" component="h2">
                        CONTACT
                    </Typography>

                    <Typography variant="h5" weight="meduim" theme="black" component="h2">
                        Don&apos;t be shy! Hit me up! 👇
                    </Typography>

                    <div className="flex space-x-40 reative py-10   ">
                        <div className="flex relative space-x-6 ">
                        <RiMapPin2Fill size={50} color="blue" className="mt-4" />

                                <div className="mt-1" >
                                     <Typography
                                variant="caption1" theme="gray-600" weight="meduim" className="mb-4 text-gray font-extrabold" >
                                Location
                            </Typography>

                            <Typography
                                variant="caption1" theme="gray-600" weight="meduim" className="mt-4" >
                                Africa,Benin
                            </Typography>
                                </div>

                          
                        </div>

                        <div className="flex relative space-x-6 ">
                        <RiMailCheckLine size={55} color="blue" className="mt-4" />
                        <div className="mt-1" >

                                     <Typography
                                variant="caption1" theme="black" weight="meduim" className="mb-4 text-gray font-extrabold"  >
                                Mail
                            </Typography>

                            <Typography
                                variant="caption1" theme="gray-600" weight="meduim" className="mt-4" >
                                estimegliti108@gmail.com
                            </Typography>
                                </div>
                           
                        </div>



                    </div>
                    
                </div>

             

               
            </Container>
        </div>
    )
}; 