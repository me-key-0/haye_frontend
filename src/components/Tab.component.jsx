import { Component } from 'react';

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Hotels',
    };
  }

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div>
        {/* Tab Navigation */}
        <div className="w-3/4 mx-auto text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {['Hotels', 'Restaurants', 'Cafes', 'Lounges'].map((tab) => (
              <li key={tab} className="me-2">
                <button
                  className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    activeTab === tab
                      ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                      : ''
                  }`}
                  onClick={() => this.setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'Hotels' && (
            <div>
              <h2 className="w-3/4 mx-auto text-xl font-semibold">Hotels</h2>
              <p className="w-3/4 mx-auto text-gray-500">Display content related to hotels here.</p>
            </div>
          )}
          {activeTab === 'Restaurants' && (
            <div>
              <h2 className="w-3/4 mx-auto text-xl font-semibold">Restaurants</h2>
              <p className="w-3/4 mx-auto text-gray-500">Display content related to restaurants here.</p>
            </div>
          )}
          {activeTab === 'Cafes' && (
            <div>
              <h2 className="w-3/4 mx-auto text-xl font-semibold">Cafes</h2>
              <p className="w-3/4 mx-auto text-gray-500">Display content related to cafes here.</p>
            </div>
          )}
          {activeTab === 'Lounges' && (
            <div>
              <h2 className="w-3/4 mx-auto text-xl font-semibold">Lounges</h2>
              <p className="w-3/4 mx-auto text-gray-500">Display content related to lounges here.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Tab;
