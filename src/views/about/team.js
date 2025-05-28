import React from "react";
import { TeamCard } from '@dana-allen/gdb-core';

const Team = () => {
    return (
        <div class="container">
            <h2>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} Team </h2>
            <br></br>
            <TeamCard 
                    name={'Dr Kirstyn Brunker'} 
                    nameLink={''} 
                    title={'Research Fellow, School of Biodiversity, Animal Health & Comparative Medicine'} 
                    info={'Dr. Brunker is an MRC research fellow passionate about applying genomics in One Health systems to enhance pathogen surveillance and management in low- and middle-income countries. Her research focuses on developing platforms for deployable and accessible sequencing and analysis of the rabies virus, with the goal of converting knowledge into action. This involves generating and analysing near real-time genetic data for routine surveillance and rapid epidemiological investigations.'}
                    src={'/team/KirstynBrunker.jpg'}
                    rg={"https://www.researchgate.net/profile/Kirstyn_Brunker"}
                    twitter={"https://twitter.com/intent/follow?screen_name=kirstynbrunker"}
            />
            <br></br>
            <TeamCard 
                    name={'Dr Roman Biek'} 
                    nameLink={''} 
                    title={'Reader, Institute of Biodiversity, Animal Health and Comparative Medicine'} 
                    info={'Dr. Roman Biek is an evolutionary ecologist studying infectious disease dynamics in animal populations. Much of his research has focussed on zoonotic pathogens, including rabies virus. He is particularly interested in the environmental and evolutionary drivers of pathogen emergence, spread, and persistence and how these drivers can be identified by integrating genetic information with other types of data.'}
                    src={'/team/RomanBiek.jpg'}
                    rg={"https://www.researchgate.net/profile/Roman_Biek"}
                    twitter={"https://twitter.com/intent/follow?screen_name=rbiek"}
            />
            <br></br>
            <TeamCard 
                name={'Dr Rob Gifford'}
                nameLink={''}
                title={'Research Bioinformatician / Evolutionary Biologist at the Centre for Virus Research'}
                info={'Dr Gifford\'s research addresses the ecology and evolution of viruses. He has a strong interest in facilitating the use of genetic approaches to track viral evolution.'}
                src={'/team/RobGifford.jpg'}
                rg={'https://www.researchgate.net/profile/Robert_Gifford'}
                twitter={'https://twitter.com/intent/follow?screen_name=paleovirologist'}
            />
            <br></br>
            <TeamCard 
                name={'Prof Katie Hampson'}
                nameLink={''}
                title={'Professor, School of Biodiversity, Animal Health & Comparative Medicine'}
                info={'Dr Katie Hampson is a Wellcome Trust Senior Research Fellow. Her research focuses on the epidemiological dynamics and control of dog-mediated rabies combining field research with quantitative analyses, working in East Africa, Southeast Asia, Latin America and Europe, to address fundamental and applied questions. In Tanzania, she uses contact tracing and whole genome sequencing, combined with large-scale vaccination programmes and surveillance systems to understand transmission dynamics and investigate cost-effective approaches for rabies control and prevention. With international organisations and governments she uses modelling and analyses to learn from control efforts, with a focus on disease elimination.'}
                src={'/team/KatieHampson.jpg'}
                rg={'https://www.researchgate.net/profile/Katie_Hampson'}
                twitter={'https://twitter.com/intent/follow?screen_name=hampson_katie'}
            />
            <br></br>
            
            
            <TeamCard 
                name={'Dr Denise Marston'}
                nameLink={''}
                title={'Senior Scientific Officer, Wildlife Zoonoses & Vector-Borne Diseases Research Group, Animal and Plant Health Agency'}
                info={'Denise Marston is a postdoctoral researcher and rabies molecular test consultant at the UK OIE reference laboratory for rabies. Her key research interests are utilising NGS methodologies to investigate the transmission and evolution of zoonotic viruses between different host reservoirs (in particular rabies viruses). Denise has been involved in the discovery and characterisation of a number of novel lyssaviruses including Ikoma lyssavirus and Gannoruwa bat lyssavirus and has a keen interest in promoting the use of whole genome sequences for virus characterisation.'}
                src={'/team/DeniseMarston.jpg'}
                rg={'https://www.researchgate.net/profile/Denise_Marston2'}
                twitter={'https://twitter.com/intent/follow?screen_name=denisemarston'}
            />
            <br></br>
            <TeamCard 
                name={'Dr Sandeep Kasaragod'}
                nameLink={''}
                title={'Bioinformatician, School of Biodiversity, Animal Health & Comparative Medicine'}
                info={'Dr. Kasaragod is a Bioinformatician, he is passionate about working on genome sequencing data analysis. He works majorly on the development of the workflow and tools to support the virus research.'}
                src={'/rabies_favicon_md.svg'}
                rg={null}
                twitter={null}
            />
            <br></br>
            <TeamCard 
                name={'Dr Joseph Hughes'}
                nameLink={''}
                title={'Bioinformatician, MRC University of Glasgow Centre for Virus Research'}
                info={null}
                src={'/rabies_favicon_md.svg'}
                rg={null}
                twitter={null}
            />
            <br></br>
            <TeamCard 
                name={'Dana Allen'}
                nameLink={''}
                title={'Research Software Engineer, MRC University of Glasgow Centre for Virus Research'}
                info={null}
                src={'/rabies_favicon_md.svg'}
                rg={null}
                twitter={null}
            />
            <br></br>


            <TeamCard 
                    name={'Dr Daniel Streicker'} 
                    nameLink={''} 
                    title={'Sir Henry Dale Research Fellow, Institute of Biodiversity, Animal Health and Comparative Medicine'} 
                    info={'Dr Streicker uses approaches from ecology and evolutionary biology to improve forecasting, prevention and control of emerging viruses. His current research interests include identifying how host ecology and phylogeny shape patterns of cross species transmission in bat rabies, understanding why culling has failed to prevent rabies spillover from vampire bats to livestock and whether oral vaccines could be more effective and how information in viral genomes can inform surveillance and response to emerging RNA viruses.'}
                    src={'/team/DanielStreicker.jpg'}
                    rg={"https://www.researchgate.net/profile/Daniel_Streicker"}
                    twitter={"https://twitter.com/intent/follow?screen_name=DanielStreicker"}
            />
            <br></br>
            <TeamCard 
                name={'Dr Andres Velasco-Villa'}
                nameLink={''}
                title={'Associate Service Fellow Microbiologist at the Pox Virus Rabies Branch, Division of High Consequence Pathogens and Pathology, Centers for Disease Control and Prevention'}
                info={'Dr Velasco-Villa has worked on a wide breadth of public health related laboratory-based activities for the early detection and monitoring of RABV major reservoir hosts, worldwide. He is particularly interested in understanding contemporary/historical dissemination and transmission pathways leading to rabies virus current complex ecology. Dr Velasco-Villa’s research has contributed to the identification of the canine origin of major ongoing wildlife rabies epizootics in the Americas, Asia and Africa, as a consequence of longstanding rabies epizootics in domestic dogs. Dr Velasco-Villa has spent most of his career studying the diversity of RABV in different species of bats, discovering potentially cryptic cycles and rare transmission chains likely derived in viral host shifts in to terrestrial mesocarnivores across the Americas. His lifetime work has had a direct impact on disease control, prevention and elimination efforts globally.'}
                src={'/team/AndresVelascoVilla.jpg'}
                rg={'https://www.researchgate.net/profile/Andres_Velasco-Villa'}
                twitter={null}
            />
            <hr></hr>
            <h2>Former Members</h2> 
            <TeamCard 
                name={'Dr Josh Singer'}
                nameLink={''}
                title={'Research Software Engineer at the Centre for Virus Research'}
                info={null}
                src={'/team/JoshSinger.jpg'}
                rg={null}
                twitter={null}
            />
            <br></br>
            <TeamCard 
                name={'Dr Orges Koci'}
                nameLink={''}
                title={'Research Software Engineer at the Centre for Virus Research'}
                info={'Dr Koci is a research software engineer with academic experience in software development and bioinformatics. He maintains GLUE, the data-centric virus sequence software framework which underlies the RABV-GLUE project. He also maintains the RABV-GLUE dataset and web application.'}
                src={'/team/OrgesKoci.jpg'}
                rg={'https://www.researchgate.net/profile/Orges_Koci2'}
                twitter={null}
            />
            <br></br>
            <TeamCard 
                name={'Afrida Mukaddas'}
                nameLink={''}
                title={'Research Software Engineer at the Centre for Virus Research'}
                info={null}
                src={'/team/AfridaMukaddas.jpeg'}
                rg={null}
                twitter={null}
            />
            <br></br>
            <TeamCard 
                name={'Dr Kathryn Campbell'}
                nameLink={''}
                title={'PhD Student, Institute of Biodiversity, Animal Health and Comparative Medicine'}
                info={'Kathryn Campbell is a former PhD student whose work encompassed aspects of genomic surveillance to guide rabies elimination. Her research focused on producing an easy-to-use, objective and transferable classification tool (MAD DOG) for tracking viruses at high resolution. This allows identification of areas of persistence and transmission and patterns of virus spread not previously apparent with coarser resolution classifications.'}
                src={'/team/KathrynCampbell.jpg'}
                rg={'https://www.researchgate.net/profile/Kathryn-Campbell-7'}
                twitter={'https://twitter.com/intent/follow?screen_name=ThatKatC'}
            />
            <br></br>
            
        </div>
    );
};
 
export default Team;
