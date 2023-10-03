import MainLayout from "../layouts/mainLayout";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <MainLayout title={t("description.dashboard")}>
      <div className="col-md-auto p-5">
        <form>
          <div row className="mb-3 g-3">
            <div className="text-center">
              <span>
                <p>
                  <h6>{t("description.options")}</h6>
                </p>
              </span>
              <br />
              <div>
                <Link to="/coordinates-update">
                  <input
                    type="button"
                    className="btn btn-md btn-dark btn-wide"
                    value={t("description.updateCoordinate")}
                    name="chosenOption"
                  />
                </Link>

                <b className="pl-2 pr-2"> or</b>
                <Link to="/credentials-update">
                  <input
                    type="button"
                    className="btn btn-md btn-secondary btn-wide m-1"
                    value={t("description.resetPassword")}
                    name="chosenOption"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div class="gap gap-20px"></div>
        </form>
      </div>
    </MainLayout>
  );
}
