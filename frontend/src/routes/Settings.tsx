import ContainerRow from "../components/ContainerRow";
import SettingsForm from "../components/SettingsForm";

function Settings() {
    return (
        <div className="settings-page">
            <ContainerRow>
                <SettingsForm/>
            </ContainerRow>
        </div>
    )
}

export default Settings;