import { ImportWizard } from "./ImportWizard"
import { UserForm } from "./UserForm"
import Nav from 'react-bootstrap/Nav';
import { useState, useContext } from "react";
import { TitledContent } from "../../components/utils/TitledContent";
import { useAdminUser } from "../../api/useAdminUser";
import { UserContext, UserContextWrapper } from "./UserContext";
import { CodeRenewer } from "./CodeRenewer";

const PANELS = {
    AddUser: 1,
    ImportUsers: 2,
    EditUser: 3,
    RenewCode: 4
}

const UpdateUserInfos = ({ onSubmit }) => {
    const InnerForm = (props) => {
        const { user, resetUser } = useContext(UserContext)
        return (
            <UserForm user={user} onReset={resetUser} {...props} />
        )
    }

    return (
        <TitledContent title="Modifier un utilisateur">
            <UserContextWrapper>
                <InnerForm onSubmit={onSubmit} submitButtonLabel="Modifier" />
            </UserContextWrapper>
        </TitledContent>
    )
}

const UsersEditor = () => {
    const [panel, setPanel] = useState(1)
    const { upsertUser, importUsers, editUserCode } = useAdminUser()

    const handleUserUpsert = async (user) => {
        return await upsertUser(user);
    }

    const handleImport = (users) => {
        return importUsers(users)
    }

    const handleRenew = async (userId) => {
        return await editUserCode(userId)
    }

    const navCallback = (key) => {
        setPanel(PANELS[key])
    }

    return (
        <div className="hstack mt-4">
            <div className=" me-2 mb-auto">
                <Nav defaultActiveKey="AddUser" className="flex-column" variant="pills" onSelect={navCallback}>
                    <Nav.Link eventKey="AddUser">Ajouter un utilisateur</Nav.Link>
                    <Nav.Link eventKey="ImportUsers">Importer des utilisateurs</Nav.Link>
                    <Nav.Link eventKey="EditUser">Modifier un utilisateur</Nav.Link>
                    <Nav.Link eventKey="RenewCode">Changer code d'invitation</Nav.Link>
                </Nav>
            </div>
            <div className="container bg-body rounded shadow-sm p-5 mb-auto">
                {(panel === PANELS.AddUser) && <TitledContent title="Ajouter un utilisateur">
                    <UserForm user={{}} onSubmit={handleUserUpsert} submitButtonLabel="Ajouter" />
                </TitledContent>}
                {(panel === PANELS.ImportUsers) && <TitledContent title="Importer une liste d'utilisateurs">
                    <ImportWizard handler={handleImport} />
                </TitledContent>}
                {(panel === PANELS.EditUser) && <UpdateUserInfos onSubmit={handleUserUpsert} />}
                {(panel === PANELS.RenewCode) && <TitledContent title="Renouveler le code d'invitation">
                    <UserContextWrapper>
                        <CodeRenewer onRenew={handleRenew} />
                    </UserContextWrapper>
                </TitledContent>}
            </div>
        </div>
    )
}

export default UsersEditor