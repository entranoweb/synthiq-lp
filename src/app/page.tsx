
import SiteHeader from "@/components/site-header";
import {HeroSection} from "@/components/hero-section";
import {LogoTicker} from "@/components/logo-ticker";
import SiteFooter from "@/components/site-footer";
import {CallToAction} from "@/components/call-to-action";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import {GithubIndicator} from "@/components/github-indicator";
import AbstractBall from "@/components/glob";
import Orb from "./Orb";
import { BenefitsComponent } from "@/components/BenefitsComponent";
import Header from "@/components/site-header";
import { MetricsTicker } from "@/components/metrics-ticker";
import ServiceHighlights from "@/components/ServiceHighlights";
import ROICalculator from "@/components/ROICalculator";
import ProcessSteps from "@/components/ProcessSteps";
import { GrShareOption } from "react-icons/gr";
import { PiBrain } from "react-icons/pi";
import { GoRocket } from "react-icons/go";
import TrustSection from "@/components/TrustSection";
import VideoPlayer from "@/components/VideoPlayer";

const stepsData = [
    {
      step: 1,
      icon: GrShareOption,
      title: 'Step One',
      description: "1-week integration process tailored to your hotel's systems",
    },
    {
      step: 2,
      icon: PiBrain,
      title: 'Step Two',
      description: 'Voice agent trained on your specific services, policies, and procedures.',
    },
    {
      step: 3,
      icon: GoRocket,
      title: 'Step Three',
      description: 'Seamless deployment with 24/7 technical support.',
    },
  ];

  const trustData = {
    certifications: ['ISO 9001', 'ISO 27001', 'GDPR Compliance'],
    partnerships: ['Microsoft Partner', 'HCL Tech partner', 'AWS Partner'],
    guarantees: ['99.9% Uptime', '24/7 Support', 'Money-back Guarantee'],
  };
  

export default function Home() {
    return (
        <>
            <Header/>
            <HeroSection />
            <MetricsTicker/>
            <LogoTicker />
            
            <ServiceHighlights/>
            <Orb/>
            <ROICalculator/>
            <Testimonials />
            <ProcessSteps steps={stepsData}/>
            <VideoPlayer videoUrl="https://player.vimeo.com/video/1004453933?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" title="Synthiq Room Service Demo" />

            <TrustSection trustElements={trustData} />
            <CallToAction />
            
           
            <SiteFooter />
        </>
    );
}
