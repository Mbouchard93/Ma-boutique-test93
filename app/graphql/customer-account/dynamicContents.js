export const CONTENUE_QUERRY = ` #graphql
    query contenue {
      metaobjects(first:100, type: "contenue"){
        nodes{
          id
          titre : field(key:"titre"){
            value
          }
          description : field(key: "description"){
            value
          }
          label: field(key: "bouton"){
            value
          }
          link : field(key: "link_url"){
          value
          }
        }
      }
    }
    `;
