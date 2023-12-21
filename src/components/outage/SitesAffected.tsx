import { OutageRecord } from "src/hooks/backend/useOutage";
import useOutageLocation from "src/hooks/backend/useOutageLocation";


type Site = {
    label: string,
    users: number,
    accronym: string
}

type SitesAffectedProps = {
    outage: OutageRecord,
    sites: Site[],
    compact?: boolean
}

const SITES: Site[] = [
    {
        label: 'My Mobility',
        users: 3000,
        accronym: 'MyMob'
    },
    {
        label: 'Burnley',
        users: 500,
        accronym: 'BLY',
    },
    {
        label: 'Casablanca',
        users: 500,
        accronym: 'CAS',
    },
    {
        label: 'Colomiers',
        users: 500,
        accronym: 'CLM',
    },
    {
        label: 'Florange',
        users: 500,
        accronym: 'FLO',
    },
    {
        label: 'Hambourg',
        users: 500,
        accronym: 'HBG',
    },
    {
        label: 'Indianapolis',
        users: 500,
        accronym: 'IND',
    },
    {
        label: 'Le Havre',
        users: 500,
        accronym: 'LEH',
    },
    {
        label: 'Mobile',
        users: 500,
        accronym: 'MOB',
    },
    {
        label: 'Pont-Audemer',
        users: 500,
        accronym: 'PON',
    },
    {
        label: 'Saclay',
        users: 500,
        accronym: 'CMH',
    },
    {
        label: 'Tianjin',
        users: 500,
        accronym: 'TJN',
    }
]

function getSites(): Site[] {
    return SITES;
}

const SitesAffected = (props: SitesAffectedProps) => {
    const { locations, find } = useOutageLocation(props.outage.id);

    const getVariant = (siteLabel: string): string => {
        let variant: string = 'light';

        if (locations) {
            const location = find(loc => loc.location.name === siteLabel)

            if (location) {
                if (location.relationId === 2) {
                    variant = 'danger';
                } else if (location.relationId === 3) {
                    variant = 'success';
                } 
            }

        }

        return variant;
    }

    return (<>
        <div className="sites">
            {props.sites.map(site => {
                return <LocationBadge site={site} variant={getVariant(site.label)} compact={props.compact || false} />
            })}
        </div>
    </>)
}

const LocationBadge = (props: { site: Site, variant: string, compact: boolean }) => {
    const {site, variant, compact} = props;
    return (
        <span key={site.accronym} className={`badge rounded-pill text-bg-${variant} me-1`}>{(compact) ? site.accronym : site.label }</span>
    )
}

export { SitesAffected, getSites };