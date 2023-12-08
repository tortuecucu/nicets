import { useForm } from "react-hook-form"
import { useList } from "../../hooks/custom/useList";
import { TableList } from "../../components/form/ListEdit";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./news.css"
import { WrappedInput } from "../components/Wrapper";
import { WrappedDatetime } from "../components/DateTime";

const COLUMNS = [
  {
    property: 'id',
    label: '#',
    formatter: (v) => { return v }
  },
  {
    property: 'title',
    label: 'Titre',
    formatter: (v) => { return v }
  },
  {
    property: 'description',
    label: 'Description',
    formatter: (v) => { return <span title={v}>{(v && v.length < 150) ? v : String(v).substring(0, 150) + '...'}</span> }
  },
  {
    property: 'href',
    label: 'Lien',
    formatter: (v) => { return <a href={v} title={v} target="_blank" rel='noreferrer'>lien</a> }
  },
  {
    property: 'published',
    label: 'Publié',
    formatter: (v) => { return (v === true) ? 'publié' : 'non publié' }
  }
]

const TEMPLATE = {
  id: null,
  title: null,
  description: null,
  href: null,
  published: true,
  startAt: new Date(Date.now()),
  endAt: null
}

const NewsEditor = () => {
  const errorCallback = (item, action) => {
    console.warn(item, action)
  }

  const { items, addItem, updateItem, deleteItem } = useList('newslink', {
    onError: errorCallback
  });
  const [editedItem, setEditedItem] = useState(null);

  const updateCallback = (item) => {
    setEditedItem(item);
  }

  const addCallback = () => {
    setEditedItem(null);
  }

  const addHandler = (item) => {
    console.log('addHAndler', item)
    addItem(item)
      .then(data => {
        console.info(data)
      })
      .catch(err => {
        console.error(err);
      })
  }

  const deleteHandler = (item) => {
    deleteItem(item)
      .then(data => { //TODO: update
        console.info(data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const updateHandler = (item) => {
    updateItem(item)
      .then(data => {
        console.info(data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (<>
    <div className="bg-primary p-2 rounded shadow my-4">
      <div className="hstack">
        <h4 className="mb-3 text-white">Actualités actives</h4>
        <Button className="ms-auto btn-outline-light" onClick={addCallback}>Ajouter</Button>
      </div>
      <div className="news">
        <TableList items={items} onAdd={addCallback} onDelete={deleteHandler} onUpdate={updateCallback} columns={COLUMNS} />
      </div>
    </div>
    <NewsForm item={editedItem} onAdd={addHandler} onUpdate={updateHandler} template={TEMPLATE} />
  </>)

}

const NewsForm = ({ item, template, onAdd, onUpdate }) => {
  const { register, handleSubmit, reset, control } = useForm();

  useEffect(() => {
    if (item) {
      reset(item)
    } else {
      reset(template)
    }
  }, [item])

  const onSubmit = (data) => {
    if (item && item.id) {
      onUpdate({
        ...item,
        ...data
      })
    } else {
      onAdd({
        ...template,
        ...data
      });
      reset(template);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded shadow p-4">
        <h3>{item ? 'Modifier une actualité' : 'Ajouter une actualité'}</h3>

        <div className="bg-body-tertiary px-4 pb-4 rounded shadow-sm ">
          <h4 className="pt-3">Informations</h4>
          <WrappedInput id="shortDescription" label="Titre" inputProps={{
            ...register("title", { required: true })
          }} />
          <WrappedInput id="description" label="Description" inputProps={{
            type: 'textarea',
            rows: 5,
            ...register("description", { required: true })
          }} />
          <WrappedInput id="link" label="Lien" inputProps={{
            ...register("href", { required: true })
          }} />
        </div>

        <div className="bg-body-tertiary px-4 pb-4 rounded shadow-sm mt-3">
          <h4 className="pt-3">Paramètres de publication</h4>

          <WrappedDatetime control={control} name="startAt" id="startAt" label="Début Publication" />
          <WrappedDatetime control={control} name="endAt" id="startAt" label="Fin Publication" />

          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="published" {...register("published")}></input>
            <label className="form-check-label" htmlFor="published">Publier l'actualité</label>
          </div>

        </div>

        <input type="submit" className="m-4 mb-0 btn btn-primary btn-lg ms-auto" />

      </div>
    </form>
  )
}

export default NewsEditor 