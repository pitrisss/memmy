import React, {useCallback, useState} from "react";
import {VStack} from "native-base";
import {Settings, StyleSheet, Switch} from "react-native";
import {Cell, Section, TableView} from "react-native-tableview-simple";
import {useFocusEffect, useRouter} from "expo-router";
import ILemmyServer from "../../../lemmy/types/ILemmyServer";
import {getBuildNumber, getVersion} from "react-native-device-info";

const SettingsIndexScreen = () => {
    const [server, setServer] = useState(Settings.get("servers")[0] as ILemmyServer);

    const router = useRouter();

    useFocusEffect(useCallback(() => {
        setServer(Settings.get("servers")[0] as ILemmyServer);
    }, []));

    return (
        <VStack>
            <TableView style={styles.table}>
                <Section
                    header={"ACCOUNT"}
                    roundedCorners={true}
                    hideSurroundingSeparators={true}
                >
                    <Cell
                        cellStyle={"RightDetail"}
                        title={"Server"}
                        detail={server.server}
                    />
                    <Cell
                        cellStyle={"RightDetail"}
                        title={"Username"}
                        detail={server.username}
                    />

                    <Cell
                        cellStyle={"Basic"}
                        title={"Change Account Settings"}
                        accessory={"DisclosureIndicator"}
                        onPress={() => router.push("/tabs/settings/editAccount")}
                    />
                </Section>

                <Section
                    header={"APPEARANCE"}
                    roundedCorners={true}
                    hideSurroundingSeparators={true}
                >
                    <Cell
                        title={"Disable Comment Swipe Gestures"}
                        cellAccessoryView={<Switch />}
                    />
                </Section>

                <Section
                    header={"ABOUT"}
                    roundedCorners={true}
                    hideSurroundingSeparators={true}
                >
                    <Cell
                        cellStyle={"RightDetail"}
                        title={"Version"}
                        detail={`${getVersion()} (${getBuildNumber()})`}
                    />
                </Section>

                <Section
                    header={"DEBUG"}
                    roundedCorners={true}
                    hideSurroundingSeparators={true}
                >

                </Section>
            </TableView>
        </VStack>
    );
};

const styles = StyleSheet.create({
    table: {
        marginHorizontal: 15
    }
});

export default SettingsIndexScreen;