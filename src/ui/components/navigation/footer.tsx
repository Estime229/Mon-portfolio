import { Container } from '@/ui/components/container/container';
import { Typography } from '@/ui/design-system/typography/typography';
import Image from 'next/image';
import { footerApplicationLinks, footerLinks } from './app-links';
import { footerUserLinks } from './app-links';
import { v4 as uuidv4 } from 'uuid';
import { ActiveLink } from './active-link';
import { AppLinks, FooterLinks } from '@/types/app-links';
import { LinkTypes } from '@/lib/link-type';
import { SocialNetworksButtons } from './social-networks-buttons';


export const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (

        <div className="bg-gray ">
        

            <Container className='pt-9 pb-11 space-y-11'>
              
                <div className='flex items-center justify-between'>
                    <Typography variant='caption4' theme='gray'>
                        {`coprigth @ ${currentYear}  |  Propulsed  by `} {""}
                        <a href="https:/gliti-estime.fr" target='_blank' className='underline'> Estime Gliti</a>
                        {`- All rigths are reserved`}
                    </Typography>
           
                    <div className="">
                    <SocialNetworksButtons theme='gray'ClassName='' />
                </div>
                </div>
            </Container>

        </div>
    ); 
};

interface footerLinkProps{

data: FooterLinks;

}




  