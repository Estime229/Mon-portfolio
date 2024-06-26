import { AppLinks } from "@/types/app-links";
import { RiGithubFill, RiLinkedinFill, RiSlackFill, RiYoutubeFill } from "react-icons/ri";

export const footerApplicationLinks: AppLinks [] = [
    {
        label: "Accueil",
        baseUrl: "/",
        type: "internal", 
    },

    {
        label: "Projets",
        baseUrl: "/#",
        type: "internal", 
    },

    {
        label: "Coders Monkeys",
        baseUrl: "/#",
        type: "internal", 
    },

    {
        label: "Formations",
        baseUrl: "https://youtube.com@remotemonkey",
        type: "external", 
    },

];

export const footerUserLinks: AppLinks [] = [
    {
        label: "Mon espace",
        baseUrl: "/#",
        type: "internal", 
    },

    {
        label: "Connexion",
        baseUrl: "/connexion",
        type: "internal", 
    },

    {
        label: "Inscription",
        baseUrl: "/connexion/inscription",
        type: "internal", 
    },

    {
        label: "Mot de passe oublié",
        baseUrl: "/connexion/mots-de-passe-perdu",
        type: "internal", 
    },

];
const footerInformationLinks: AppLinks [] = [
    {
        label: "CGU",
        baseUrl: "/#",
        type: "internal", 
    },

    {
        label: "Confidentialité",
        baseUrl: "/#",
        type: "internal", 
    },

    {
        label: "A propos",
        baseUrl: "/#",
        type: "internal", 
    },
    
    {
        label: "Contact",
        baseUrl: "/#",
        type: "internal", 
    },


];

export const footerSocialNetworksLinks: AppLinks [] = [
    {
        label: "Github",
        baseUrl: "https://youtube.com@remotemonkey",
        type: "external", 
        icon: RiGithubFill,
    },

    {
        label: "Linkeldin",
        baseUrl: "https://youtube.com@remotemonkey",
        type: "external", 
        icon: RiLinkedinFill,
    },

    {
        label: "Stack",
        baseUrl: "https://youtube.com@remotemonkey",
        type: "external", 
        icon: RiSlackFill,
    },
 
];

export const footerLinks = [
    {
        label: "App",
        links : footerApplicationLinks,
    },

    {
        label: "Utilisateurs",
        links : footerUserLinks,
    },

    {
        label: "Informations",
        links : footerInformationLinks,
    },

    {
        label: "Réseaux",
        links : footerSocialNetworksLinks,
    },
]

