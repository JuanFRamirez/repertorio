import { Col, Row } from 'react-bootstrap';
import { useMemo, useState } from 'react';
import './App.css';
import { songs } from './songs/songs.js';

interface Song {
  id: number;
  name: string;
  link: string;
  category?: string | null;
  author: string;
}

function App() {
  const songList: Song[] = songs;

  const [search, setSearch] = useState('');
  const [author, setAuthor] = useState('all');

  // Obtener autores únicos
  const authors = useMemo(() => {
    const list = songList.map((s) => s.author).filter(Boolean) as string[];

    return ['all', ...Array.from(new Set(list))];
  }, [songList]);

  // Filtrado de canciones
  const filteredSongs = useMemo(() => {
    return songList.filter((song) => {
      const matchesSearch =
        song.name.toLowerCase().includes(search.toLowerCase()) ||
        song.author.toLowerCase().includes(search.toLowerCase());

      const matchesAuthor = author === 'all' || song.author === author;

      return matchesSearch && matchesAuthor;
    });
  }, [songList, search, author]);

  return (
    <div className='app'>
      <section className='hero'>
        <div className='overlay' />

        <div className='hero-content'>
          <div className='main-header'>
            <h1 className='hero-title text-light'>Repertorio de Adoración</h1>

            <p className='hero-subtitle mb-2'>
              Canciones para ministración, alabanza y adoración - Músicos Aguas
              de Vida
            </p>
          </div>

          {/* SEARCH + AUTHOR FILTER */}
           <small
              className='text-light text-center d-block'
              style={{ marginBottom: '50px' }}
            >
              Salmos 33:3 “Cantadle cántico nuevo; hacedlo bien, tocad con
              júbilo.”
            </small>
          <Row className='justify-content-center my-4 g-2'>
            <Col xs={12} md={6}>
              <input
                type='text'
                placeholder='Buscar canción o autor...'
                className='form-control rounded-pill text-center'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>

            <Col xs={12} md={3}>
              <select
                className='form-control rounded-pill text-center'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              >
                {authors.map((a) => (
                  <option key={a} value={a}>
                    {a === 'all' ? 'Todos los autores' : a}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          {/* SONGS */}
          <div className='songs-grid'>
            {filteredSongs.map((song) => (
              <a
                key={song.id}
                href={song.link || '#'}
                target='_blank'
                rel='noreferrer'
                className='song-card'
                style={{ textDecoration: 'none' }}
              >
                <div className='song-title'>{song.name}</div>

                <p className='song-author'>
                  ● {song.author || 'Autor desconocido'}
                </p>

                {song.category && (
                  <span className='song-category'>{song.category}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
