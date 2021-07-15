import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(props) {
  return (
    <Box as='aside'>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: "8px" }}></img>
    <hr />

    <p>
      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
    </p>
    <hr />

    <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {props.title} ({props.items.length})
    </h2>
    <ul>
      {/* {followers.map((actualItem) => {
        return (
          <li key={actualItem}>
            <a href={`/users/${actualItem.title}`}>
              <img src={actualItem.image} />
              <span>{actualItem.title}</span>
            </a>
          </li>
        )
      })} */}
    </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const RandomUser = 'LoboNeves';
  const [communities, setCommunities] = React.useState([]);
  const favorites = ['jardeson777', 'luucasfreitas', 'matheusromaneli']

  const [followers, setFollowers] = React.useState([]);
  // Pegar o array de dados do github
  React.useEffect(function() {
    fetch('https://api.github.com/users/peas/followers')
    .then(function (serverResponse) {
      return serverResponse.json();
    })
    .then(function (completeResponse) {
      setFollowers(completeResponse);
    }) 

    //API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '1e176e73c61fe608cb3c64c81bf4d3',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) //Pega o retorno do response.json() e já retorna
    .then((completeResponse) => {
      const communitiesComeFromDato = completeResponse.data.allCommunities;
      console.log(communitiesComeFromDato)
      setCommunities(communitiesComeFromDato)
    })

  }, [])

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className = "profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={RandomUser} />
        </div>
        <div className = "welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer ?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosdoForm = new FormData(e.target);

              const community = {
                title: dadosdoForm.get('title'),
                imageUrl: dadosdoForm.get('image'),
                creatorSlug: RandomUser,
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(community)
              })
              .then(async (response) => {
                const data = await response.json();
                console.log(data.createdRegist);
                const community = data.createdRegist;
                const updatedCommunities = [...communities, community];
                setCommunities(updatedCommunities);
              })


            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade ?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade ?"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className = "profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>          
          <ProfileRelationsBox title="Seguidores" items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((actualItem) => {
                return (
                  <li key={actualItem.id}>
                    <a href={`/communities/${actualItem.id}`}>
                      <img src={actualItem.imageUrl} />
                      <span>{actualItem.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({favorites.length})
            </h2>

            <ul>
              {favorites.map((actualItem) => {
                return (
                  <li key={actualItem}>
                    <a href={`/users/${actualItem}`}>
                      <img src={`https://github.com/${actualItem}.png`} />
                      <span>{actualItem}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
