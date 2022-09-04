import { GenericApi } from "./generic.api";
import { FakeApi } from "./fake.api";
import { IbWrapper } from "../ib/wrapper";

const makeApi = (): GenericApi => {
    if (process.env.DATA_API == "IB") return new IbWrapper();
    else return new FakeApi();
}

/** Singleton instance of GenericApi */
export const currentApi: GenericApi = makeApi();
