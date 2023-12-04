const SETTINGS = {
    1: {
        status: 'prealert',
        actions : {
            done: 'Les utilisateurs et les services supports ont été alertés qu\'un dysfonctionnement peut exister',
            ongoing: 'En attente d\'incidents créés par les utilisateurs en appelant le Helpdesk',
            next: 'Détermination de la situation réelle de l\'application'
        },
        userAttitude: 'Testez le fonctionnement de l\'application sur votre poste et appelez le Helpdesk en cas de dysfonctionnement',
        reason: 'Un doute doit être levé à propos de l\'état de l\'application',
        feedback: {
            default: {
                label: 'Appeler le HD',
                href: 'helpdesk',
                variant: 'warning'
            },
            choices: [
                {
                    label: 'Appeler le HD',
                    href: 'helpdesk',
                    variant: 'warning'
                }
            ]
        }
    },
    2: {
        status: 'outage',
        actions : {
            done: 'La chaine de commandement adaptée au dysfonctionnement a été activée',
            ongoing: 'Les composants de l\'appplication sont en cours de vérification afin d\'identifier des causes de panne',
            next: 'Un plan de retour au nominal sera défini en fonction des données technqiues et des retours utilisateurs'
        },
        userAttitude: 'Vous pouvez tester l\'application mais il est déconseillé de l\'utilsier à ce stade',
        reason: 'Nous devons déterminer qui est affecté et dans quelles conditions pour pouvoir agir au plus tôt',
        feedback: {
            default: {
                label: 'Affecté(e) ?',
                href: '/affected/$id',
                variant: 'primary'
            },
            choices: [
                {
                    label: 'Fonctionnement normal',
                    href: '/affected/$id/no',
                    variant: 'success'
                },
                {
                    label: 'Je suis affecté',
                    href: '/affected/$id/yes',
                    variant: 'danger'
                }
            ]
        }
    },
    3: {
        status: 'correcting',
        actions : {
            done: 'Les composants de l\'application ont été vérifiés et des écarts ont été mis en évidence',
            ongoing: 'Le plan de retour au nominal est engagé. Des actions techniques sont actuellement menées',
            next: 'Les paramètres vitaux seront vérifiés à nouveau puis suivis dans la durée pour garantir un fonctionnement nominal'
        },
        userAttitude: 'N\'utilisez pas l\'application! Les actions en cours peuvent temporairement la rendre instable ou inaccessible.',
        reason: 'Si vous ne l\'avez pas déjà fait, dites-nous si vous êtes affecté(e) ou non',
        feedback: {
            default: {
                label: 'Affecté(e) ?',
                href: '/affected/$id',
                variant: 'primary'
            },
            choices: [
                {
                    label: 'Fonctionnement normal',
                    href: '/affected/$id/no',
                    variant: 'success'
                },
                {
                    label: 'Je suis affecté',
                    href: '/affected/$id/yes',
                    variant: 'danger'
                }
            ]
        }
    },
    4: {
        status: 'nominalConfirming',
        actions : {
            done: 'Des actions de correction ont été réalisées afin de rétablir un fonctionnement nominal',
            ongoing: 'Nous vérifions auprès des utilsiateurs le fonctionnement de l\'application',
            next: 'Si les retours sont concluants, nous engagerons des actions de pilotage qualité'
        },
        userAttitude: 'Utilisez normalement l\'application et indiquez-nous comment elle fonctionne pour vous.',
        reason: 'Nous devons vérifier que le fonctionnement de l\'application est nominal pour tous les utilsiateurs',
        feedback: {
            default: {
                label: 'Fonctionnement OK ?',
                href: '/nominal/$id',
                variant: 'primary'
            },
            choices: [
                {
                    label: 'Oui, tout est en ordre',
                    href: '/nominal/$id/yes',
                    variant: 'success'
                },
                {
                    label: 'Non, situation inchangée',
                    href: '/nominal/$id/no',
                    variant: 'danger'
                }
            ]
        }
    },
    5: {
        status: 'workaround',
        actions : {
            done: '',
            ongoing: '',
            next: ''
        },
        userAttitude: '',
        reason: '',
        feedback: {
            default: {
                label: '',
                href: ''
            },
            choices: [
                {
                    label: '',
                    href: ''
                },
                {
                    label: '',
                    href: ''
                }
            ]
        }
    },
    6: {
        status: 'nominalClosed',
        actions : {
            done: 'La panne a été corrigée et le fonctionnement nominal validé par les utilsiateurs',
            ongoing: 'Détermination de la satisfaction des utilsateurs',
            next: 'Retour d\'expérience afin d\'améliorer notre gestion des incidents'
        },
        userAttitude: null,
        reason: 'Votre niveau de satisfaction est notre mesure de performance',
        feedback: {
            default: {
                label: 'Satisfait(e) ?',
                href: '/feedback/$id',
                variant: 'primary'
            },
            choices: [
                {
                    label: 'Satisfait(e) ?',
                    href: '/feedback/$id',
                    variant: 'primary'
                }
            ]
        }
    }
}

export default SETTINGS