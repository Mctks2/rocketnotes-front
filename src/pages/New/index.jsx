import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

import { api } from "../../services/api";

import { Container, Form } from "./styles";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Guardar os links
  const [links, setLinks] = useState([]);
  // Armazenar o novo link
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  // HandleAddLink - Adicionar um novo link, mantendo o link anterior e o atual
  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  // HandleRemoveLink - Remover um link
  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted));
  }

  // HandleAddTag - Adicionar uma nova tag
  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  // HandleRemoveTag - Remover uma tag
  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  // HandleNewNote - Criar uma nova nota
  async function handleNewNote() {

    if (!title) {
      return alert("Digite o título da nota!");
    }

    if (newLink){
      return alert("Adicione o link!");
    }

    if (newTag) {
      return alert("Adicione uma tag!");
    }

    

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })
    
    alert("Nota criada com sucesso!");
    navigate(-1);
  }


  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h2>Criar nota</h2>
            <ButtonText 
              title="Voltar"
              onClick={handleBack} 
            />
          </header>

          <Input 
            placeholder="Título" 
            onChange={e => setTitle(e.target.value)}
            />

          <Textarea 
            placeholder="Observações" 
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {
            links.map((link, index) => (
              <NoteItem
                key={String(index)}               
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))
          }
            <NoteItem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)} 
                    value={tag}
                    onClick={() => handleRemoveTag(tag)} 
                  />
                ))              
              }

              <NoteItem 
                isNew 
                placeholder="Nova tag" 
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button 
            title="Salvar"
            onClick={handleNewNote} 
          />
        </Form>
      </main>
    </Container>
  );
}
