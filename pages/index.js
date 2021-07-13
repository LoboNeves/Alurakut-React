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

export default function Home() {
  const RandomUser = 'LoboNeves';
  const [communities, setCommunities] = React.useState([{
    id: '123456789',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const favorites = ['jardeson777', 'luucasfreitas', 'matheusromaneli']

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
              const FormData = new FormData(e.target);

              const community = {
                id: new Date().toISOString(),
                title: FormData.get('title'),
                image: FormData.get('image'),
              }

              const updatedCommunities = [...communities, 'Alura Stars'];
              setCommunities(updatedCommunities);
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((actualItem) => {
                return (
                  <li key={actualItem.id}>
                    <a href={`/users/${actualItem.title}`}>
                      <img src={actualItem.image} />
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
