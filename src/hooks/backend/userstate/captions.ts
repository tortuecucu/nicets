import { StateCaptions } from "src/types/userstate";

const CAPTIONS: StateCaptions[] = [
    {
      name: 'affected',
      id: 1,
      title: "Rencontrez-vous ce dysfonctionnement ?",
      choices: [
        {
          name: 'yes',
          title: 'Oui, je constate la panne',
          text: 'La panne est présente sur mon poste, comme elle est décrite dans l\'incident',
          button: {
            label: 'Je suis affecté(e)',
            color: 'btn-danger',
          }
        },
        {
          name: 'no',
          title: 'Non, je ne suis pas affecté(e)',
          text: 'L\'application fonctionne normalement sur mon poste',
          button: {
            label: 'Tout est normal',
            color: 'btn-success',
          }
        },
        {
          name: 'undecided',
          title: 'Je ne sais pas',
          text: 'Le comportement ne me semble pas normal mais ne correspond pas à celui décrit dans l\'incident',
          button: {
            label: 'Je ne sais pas',
            color: 'btn-light',
          }
        }
      ]
    },
    {
      name: 'workaround',
      id: 2,
      title: "Le contournement fonctionne-t-il sur votre poste ?",
      choices: [
        {
          name: 'yes',
          title: 'Le contournement fonctionne',
          text: 'J\'ai appliqué le contournement et il fonctionne comme attendu',
          button: {
            label: 'Contournement OK',
            color: 'btn-success',
          }
        },
        {
          name: 'no',
          title: 'Non, la situation est inchangée',
          text: 'J\'ai appliqué le contournement mais le résultat attendu ne s\'est pas produit',
          button: {
            label: 'Contournement en échec',
            color: 'btn-danger',
          }
        },
        {
          name: 'undecided',
          title: 'Je ne sais pas',
          text: 'Le comportement a changé mais ne correspond pas à l\'attendu',
          button: {
            label: 'Je ne sais pas',
            color: 'btn-light',
          }
        }
      ]
    },
    {
      name: 'nominal',
      id: 3,
      title: "L'application est-elle revenue à la normale ?",
      choices: [
        {
          name: 'yes',
          title: 'Oui, tout est en ordre',
          text: 'Je peux utiliser l\'application comme avant la panne',
          button: {
            label: 'Fonctionnement normal',
            color: 'btn-success',
          }
        },
        {
          name: 'no',
          title: 'Non, la situation est inchangée',
          text: 'Je constate toujours la panne sur mon poste',
          button: {
            label: 'Dysfonctionnement actif',
            color: 'btn-danger',
          }
        },
        {
          name: 'undecided',
          title: 'Je ne sais pas',
          text: 'Le comportement a changé mais n\'est toujours pas revenu à la normale',
          button: {
            label: 'Je ne sais pas',
            color: 'btn-light',
          }
        }
      ]
    }
  ];

export {CAPTIONS}