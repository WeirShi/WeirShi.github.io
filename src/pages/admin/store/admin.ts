import { VuexModule, Module, getModule } from "vuex-module-decorators";
import store from "./index";

@Module({ dynamic: true, name: "admin", namespaced: true, store })
class Admin extends VuexModule {}

export const adminStoreModule = getModule(Admin);
