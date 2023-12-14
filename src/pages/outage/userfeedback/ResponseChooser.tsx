import { StateCaptions } from "src/types/userstate";

type ResponseChooserProps = {
    captions: StateCaptions,
    onSelected: (name: string) => void
}

function ResponseChooser(props: ResponseChooserProps) {
    function handleClick(name: string) {
      props.onSelected(name);
    }
  
    return (
      <>
        <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h3 className="mb-4 fs-4">{props.captions.title}</h3>
          <div>
            <ul className="list-group list-group-horizontal mb-4">
              {props.captions.choices.map(r =>
                <li key={r.name} className="list-group-item col-4">
                  <div className="d-flex flex-column mb-3 h-100">
                    <h5 className="card-title">{r.title}</h5>
                    <p className="card-text mt-auto">{r.text}</p>
                    <button  className={'btn btn-success mt-3 ' + r.button.color} onClick={() => {handleClick(r.name)}}>{r.button.label}</button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </>
    )
  }

  export {ResponseChooser}